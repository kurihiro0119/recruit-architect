import type { Hono } from 'hono';
import type { Env } from '../adapters/d1-db';
import { UserService } from '../services/user.service';
import { verifyPassword } from '../utils/password';
import { signJWT, verifyJWT } from '../utils/jwt';

interface UserJWTPayload {
  userId: string;
  email: string;
  organizationId: string;
  exp: number;
}

export function registerUserAuthRoutes(app: Hono<{ Bindings: Env }>) {
  app.post('/api/user/login', async (c) => {
    try {
      let body;
      try {
        body = await c.req.json();
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        return c.json({ error: 'Invalid JSON in request body' }, 400);
      }

      const { email, password } = body || {};

      if (!email || !password) {
        return c.json({ error: 'Email and password are required' }, 400);
      }

      console.log('User login attempt for email:', email);

      // Get user with password hash (email is unique across all organizations)
      const userResult = await c.env.DB
        .prepare('SELECT id, organization_id, email, password_hash, name, notes, created_by, updated_by, created_at, updated_at FROM users WHERE email = ? LIMIT 1')
        .bind(email)
        .first();

      if (!userResult) {
        console.error('User not found for email:', email);
        return c.json({ error: 'Invalid email or password' }, 401);
      }

      const isValid = await verifyPassword(password, userResult.password_hash as string);
      if (!isValid) {
        console.error('Password verification failed for email:', email);
        return c.json({ error: 'Invalid email or password' }, 401);
      }

      const user = {
        id: userResult.id as string,
        organizationId: userResult.organization_id as string,
        email: userResult.email as string,
        name: userResult.name as string,
        notes: userResult.notes as string | null | undefined,
        createdBy: userResult.created_by as string | null | undefined,
        updatedBy: userResult.updated_by as string | null | undefined,
        createdAt: userResult.created_at as string,
        updatedAt: userResult.updated_at as string,
      };

      // Generate JWT token
      const token = await signJWT({
        userId: user.id,
        email: user.email,
        organizationId: user.organizationId,
      });

      console.log('User login successful for email:', email);
      return c.json({
        token,
        user: {
          id: user.id,
          organizationId: user.organizationId,
          email: user.email,
          name: user.name,
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

  app.get('/api/user/verify', async (c) => {
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

      // Check if payload has userId (user token) or adminId (admin token)
      if (!('userId' in payload)) {
        return c.json({ error: 'Invalid token type' }, 401);
      }

      const userService = new UserService(c.env.DB);
      const user = await userService.getById((payload as UserJWTPayload).userId);

      if (!user) {
        return c.json({ error: 'User not found' }, 404);
      }

      return c.json({
        user: {
          id: user.id,
          organizationId: user.organizationId,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.error('Verify error:', error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  });
}

