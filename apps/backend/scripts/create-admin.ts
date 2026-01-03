#!/usr/bin/env node
/**
 * CLI script to create an admin user
 *
 * Usage:
 *   pnpm run create-admin <email> <password> <name>
 *
 * This script creates an admin user in the local D1 database.
 */

import { execSync } from "child_process";
import { writeFileSync, unlinkSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

// Password hashing using Web Crypto API (same as backend)
async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const encoder = new TextEncoder();
  const data = encoder.encode(password + saltHex);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${saltHex}:${hashHex}`;
}

async function main() {
  const args = process.argv.slice(2);

  // Check for --production flag
  const isProduction =
    args.includes("--production") || args.includes("--env=production");
  const filteredArgs = args.filter((arg) => !arg.startsWith("--"));

  if (filteredArgs.length < 3) {
    console.error(
      "Usage: npx tsx apps/backend/scripts/create-admin.ts <email> <password> <name> [--production]"
    );
    console.error("\nExample (local):");
    console.error(
      '  npx tsx apps/backend/scripts/create-admin.ts admin@example.com password123 "Admin User"'
    );
    console.error("\nExample (production):");
    console.error(
      '  npx tsx apps/backend/scripts/create-admin.ts admin@example.com password123 "Admin User" --production'
    );
    console.error(
      "\nNote: --production flag automatically adds --remote for remote database access."
    );
    process.exit(1);
  }

  const [email, password, name] = filteredArgs;
  const envFlag = isProduction ? "--env production --remote" : "--local";

  // Validate email format
  if (!email.includes("@")) {
    console.error("Error: Invalid email format");
    process.exit(1);
  }

  // Validate password length
  if (password.length < 8) {
    console.error("Error: Password must be at least 8 characters");
    process.exit(1);
  }

  try {
    // Check if admin with this email already exists
    console.log(
      `Checking if admin already exists (${
        isProduction ? "production" : "local"
      })...`
    );
    const escapedEmail = email.replace(/'/g, "''");
    const checkCommand = `wrangler d1 execute recruit-architect-db ${envFlag} --command "SELECT id, email, name FROM admins WHERE email = '${escapedEmail}';"`;
    try {
      const checkOutput = execSync(checkCommand, {
        cwd: process.cwd(),
        encoding: "utf-8",
        stdio: "pipe",
      });

      // Parse JSON output (wrangler outputs JSON array)
      const lines = checkOutput.trim().split("\n");
      let jsonStart = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith("[")) {
          jsonStart = i;
          break;
        }
      }

      if (jsonStart >= 0) {
        const jsonStr = lines.slice(jsonStart).join("\n");
        const checkResult = JSON.parse(jsonStr);
        if (
          Array.isArray(checkResult) &&
          checkResult[0]?.results &&
          checkResult[0].results.length > 0
        ) {
          const existing = checkResult[0].results[0];
          console.error(
            `\n❌ Error: Admin with email "${email}" already exists!`
          );
          console.error(`   ID: ${existing.id}`);
          console.error(`   Name: ${existing.name}`);
          console.error(
            "\nTo update the existing admin, use the API or delete it first."
          );
          process.exit(1);
        }
      }
      console.log("(No existing admin found, proceeding...)");
    } catch (checkError: any) {
      // If check fails, continue anyway (might be first admin or parsing error)
      if (checkError.status === 0) {
        // Command succeeded but might not have found anything
        console.log("(No existing admin found, proceeding...)");
      } else {
        console.log(
          "(Could not check for existing admin, proceeding anyway...)"
        );
      }
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Generate SQL
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    // Escape single quotes in SQL values
    const escapeSql = (str: string) => str.replace(/'/g, "''");

    const sql = `INSERT INTO admins (id, email, password_hash, name, created_at, updated_at)
VALUES ('${id}', '${escapeSql(email)}', '${escapeSql(
      passwordHash
    )}', '${escapeSql(name)}', '${now}', '${now}');`;

    console.log("\nCreating admin user...");
    console.log(`Email: ${email}`);
    console.log(`Name: ${name}`);
    console.log(`ID: ${id}\n`);

    // Create temporary SQL file
    const tmpFile = join(tmpdir(), `create-admin-${Date.now()}.sql`);
    writeFileSync(tmpFile, sql);

    try {
      // Execute SQL using wrangler
      const command = `wrangler d1 execute recruit-architect-db ${envFlag} --file=${tmpFile}`;
      console.log(
        `Executing SQL (${isProduction ? "production" : "local"})...\n`
      );
      execSync(command, {
        cwd: process.cwd(),
        encoding: "utf-8",
        stdio: "inherit",
      });

      console.log("\n✅ Admin user created successfully!");

      // Verify the user was created
      console.log("\nVerifying...");
      const verifyCommand = `wrangler d1 execute recruit-architect-db ${envFlag} --command "SELECT id, email, name FROM admins WHERE id = '${id}';"`;
      execSync(verifyCommand, {
        cwd: process.cwd(),
        encoding: "utf-8",
        stdio: "inherit",
      });
    } catch (execError: any) {
      // Check if it's a UNIQUE constraint error
      if (execError.status === 1) {
        console.error("\n❌ Error: Failed to create admin user.");
        console.error("This might be because:");
        console.error("  - An admin with this email already exists");
        console.error("  - Database connection failed");
        console.error("\nTo check existing admins, run:");
        console.error(
          `  wrangler d1 execute recruit-architect-db ${envFlag} --command "SELECT id, email, name FROM admins;"`
        );
        process.exit(1);
      }
      throw execError;
    } finally {
      // Clean up temporary file
      try {
        unlinkSync(tmpFile);
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  } catch (error) {
    console.error("\n❌ Error creating admin user:", error);
    if (error instanceof Error) {
      console.error("Message:", error.message);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
