import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Target,
  Building2,
  FileText,
  Users,
  Briefcase,
  GitBranch,
  Radio,
  HelpCircle,
  Home,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/', label: 'ダッシュボード', icon: Home },
  { path: '/kpis', label: 'KPI管理', icon: BarChart3 },
  { path: '/initiatives', label: '採用施策', icon: Target },
  { path: '/company-analysis', label: '企業分析', icon: Building2 },
  { path: '/job-postings', label: '求人票管理', icon: FileText },
  { path: '/job-roles', label: '業務・役割定義', icon: Users },
  { path: '/competitor-jobs', label: '他社求人', icon: Briefcase },
  { path: '/organizations', label: '組織図', icon: GitBranch },
  { path: '/selection-processes', label: '選考プロセス', icon: GitBranch },
  { path: '/recruitment-channels', label: '採用チャネル', icon: Radio },
  { path: '/faqs', label: 'FAQ', icon: HelpCircle },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Recruit Architect</h1>
          <p className="text-sm text-gray-500">採用管理システム</p>
        </div>
        <nav className="p-4 overflow-y-auto h-[calc(100vh-100px)]">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
