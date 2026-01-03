import type { Hono } from 'hono';
import type { Env } from '../adapters/d1-db';
import { AdminService } from '../services/admin.service';
import { verifyPassword } from '../utils/password';
import { signJWT, verifyJWT } from '../utils/jwt';

export function registerAdminAuthRoutes(app: Hono<{ Bindings: Env }>) {
  app.post('/api/admin/login', async (c) => {
    try {
      // Log raw request for debugging
      const contentType = c.req.header('Content-Type');
      console.log('Content-Type:', contentType);
      
      let body;
      try {
        body = await c.req.json();
        console.log('Parsed body:', { email: body?.email, hasPassword: !!body?.password });
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        const text = await c.req.text().catch(() => 'Unable to read request body');
        console.error('Request body text:', text);
        return c.json({ error: 'Invalid JSON in request body', details: parseError instanceof Error ? parseError.message : String(parseError) }, 400);
      }

      const { email, password } = body || {};

      if (!email || !password) {
        console.error('Missing email or password:', { email: !!email, password: !!password, body });
        return c.json({ error: 'Email and password are required', received: { email: !!email, password: !!password } }, 400);
      }

      console.log('Login attempt for email:', email);

      const adminService = new AdminService(c.env.DB);
      const admin = await adminService.getByEmail(email);

      if (!admin) {
        console.error('Admin not found for email:', email);
        return c.json({ error: 'Invalid email or password' }, 401);
      }

      console.log('Admin found, verifying password...');
      const isValid = await verifyPassword(password, admin.passwordHash);
      if (!isValid) {
        console.error('Password verification failed for email:', email);
        return c.json({ error: 'Invalid email or password' }, 401);
      }

      console.log('Password verified, generating token...');
      // Generate JWT token
      const token = await signJWT({
        adminId: admin.id,
        email: admin.email,
      });

      console.log('Login successful for email:', email);
      return c.json({
        token,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      return c.json({ error: 'Internal server error', details: error instanceof Error ? error.message : String(error) }, 500);
    }
  });

  app.get('/api/admin/verify', async (c) => {
    try {
      const authHeader = c.req.header('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const token = authHeader.substring(7);
      const payload = await verifyJWT(token);

      if (!payload) {
        return c.json({ error: 'Invalid token' }, 401);
      }

      // Check if payload has adminId (admin token)
      if (!('adminId' in payload)) {
        return c.json({ error: 'Invalid token type' }, 401);
      }

      const adminService = new AdminService(c.env.DB);
      const admin = await adminService.getById(payload.adminId);

      if (!admin) {
        return c.json({ error: 'Admin not found' }, 404);
      }

      return c.json({
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        },
      });
    } catch (error) {
      console.error('Verify error:', error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  });
}

