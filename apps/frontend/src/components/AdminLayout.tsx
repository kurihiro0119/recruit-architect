import { ReactNode } from 'react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useNavigate } from 'react-router-dom';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">管理者ページ</h1>
              <p className="text-sm text-gray-500">Recruit Architect</p>
            </div>
            <div className="flex items-center gap-4">
              {admin && (
                <div className="text-sm text-gray-700">
                  <span className="font-medium">{admin.name}</span>
                  <span className="text-gray-500 ml-2">({admin.email})</span>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

