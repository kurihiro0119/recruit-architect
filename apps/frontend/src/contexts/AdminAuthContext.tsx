import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminAuthApi } from '../lib/api';

interface Admin {
  id: string;
  email: string;
  name: string;
}

interface AdminAuthContextType {
  admin: Admin | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_TOKEN_KEY = 'admin_token';
const ADMIN_DATA_KEY = 'admin_data';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_DATA_KEY);
  };

  const verifyToken = async (tokenToVerify: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8787'}/api/admin/verify`, {
        headers: {
          'Authorization': `Bearer ${tokenToVerify}`,
        },
      });

      if (!response.ok) {
        throw new Error('Token verification failed');
      }

      const data = await response.json();
      return data.admin;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem(ADMIN_TOKEN_KEY);
    const storedAdmin = localStorage.getItem(ADMIN_DATA_KEY);

    if (storedToken && storedAdmin) {
      try {
        const adminData = JSON.parse(storedAdmin);
        setToken(storedToken);
        setAdmin(adminData);
        // Verify token is still valid
        verifyToken(storedToken).catch(() => {
          // Token invalid, clear storage
          logout();
        });
      } catch (error) {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        localStorage.removeItem(ADMIN_DATA_KEY);
      }
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('AdminAuthContext.login called with:', { email, password, emailLength: email.length, passwordLength: password.length });
      const response = await adminAuthApi.login(email, password);
      console.log('Login response received:', response);
      const { token: newToken, admin: adminData } = response as { token: string; admin: Admin };

      setToken(newToken);
      setAdmin(adminData);
      localStorage.setItem(ADMIN_TOKEN_KEY, newToken);
      localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(adminData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        token,
        login,
        logout,
        isLoading,
        isAuthenticated: !!token && !!admin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

