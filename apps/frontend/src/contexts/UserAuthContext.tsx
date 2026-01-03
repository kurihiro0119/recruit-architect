import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { userAuthApi, setUserAuthToken, getApiUrl } from '../lib/api';

interface User {
  id: string;
  organizationId: string;
  email: string;
  name: string;
}

interface UserAuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

const USER_TOKEN_KEY = 'user_token';
const USER_DATA_KEY = 'user_data';

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    setToken(null);
    setUser(null);
    setUserAuthToken(null); // Clear token for API calls
    localStorage.removeItem(USER_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  };

  const verifyToken = async (tokenToVerify: string) => {
    try {
      const response = await fetch(`${getApiUrl()}/api/user/verify`, {
        headers: {
          'Authorization': `Bearer ${tokenToVerify}`,
        },
      });

      if (!response.ok) {
        throw new Error('Token verification failed');
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem(USER_TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_DATA_KEY);

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
        setUserAuthToken(storedToken); // Set token for API calls
        // Verify token is still valid
        verifyToken(storedToken).catch(() => {
          // Token invalid, clear storage
          logout();
        });
      } catch (error) {
        localStorage.removeItem(USER_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
      }
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await userAuthApi.login(email, password);
      const { token: newToken, user: userData } = response as { token: string; user: User };

      setToken(newToken);
      setUser(userData);
      setUserAuthToken(newToken); // Set token for API calls
      localStorage.setItem(USER_TOKEN_KEY, newToken);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isLoading,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (context === undefined) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
}

