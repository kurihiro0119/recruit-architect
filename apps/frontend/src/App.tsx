import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import { AdminProtectedRoute } from './components/AdminProtectedRoute';
import { UserProtectedRoute } from './components/UserProtectedRoute';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { UserAuthProvider } from './contexts/UserAuthContext';
import { Dashboard } from './pages/Dashboard';
import { KpiPage } from './pages/KpiPage';
import { KpiDetailPage } from './pages/KpiDetailPage';
import { InitiativePage } from './pages/InitiativePage';
import { CompanyAnalysisPage } from './pages/CompanyAnalysisPage';
import { JobPostingPage } from './pages/JobPostingPage';
import { JobRolePage } from './pages/JobRolePage';
import { CompetitorJobPage } from './pages/CompetitorJobPage';
import { OrganizationPage } from './pages/OrganizationPage';
import { SelectionProcessPage } from './pages/SelectionProcessPage';
import { RecruitmentChannelPage } from './pages/RecruitmentChannelPage';
import { FaqPage } from './pages/FaqPage';
import { AdminPage } from './pages/AdminPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { UserLoginPage } from './pages/UserLoginPage';

function App() {
  return (
    <Routes>
      {/* User routes */}
      <Route
        path="/*"
        element={
          <UserAuthProvider>
            <Routes>
              <Route path="/login" element={<UserLoginPage />} />
              <Route
                path="/*"
                element={
                  <UserProtectedRoute>
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/kpis" element={<KpiPage />} />
                        <Route path="/kpis/:id" element={<KpiDetailPage />} />
                        <Route path="/initiatives" element={<InitiativePage />} />
                        <Route path="/company-analysis" element={<CompanyAnalysisPage />} />
                        <Route path="/job-postings" element={<JobPostingPage />} />
                        <Route path="/job-roles" element={<JobRolePage />} />
                        <Route path="/competitor-jobs" element={<CompetitorJobPage />} />
                        <Route path="/organizations" element={<OrganizationPage />} />
                        <Route path="/selection-processes" element={<SelectionProcessPage />} />
                        <Route path="/recruitment-channels" element={<RecruitmentChannelPage />} />
                        <Route path="/faqs" element={<FaqPage />} />
                      </Routes>
                    </Layout>
                  </UserProtectedRoute>
                }
              />
            </Routes>
          </UserAuthProvider>
        }
      />
      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <AdminAuthProvider>
            <Routes>
              <Route path="/login" element={<AdminLoginPage />} />
              <Route
                path="/*"
                element={
                  <AdminProtectedRoute>
                    <AdminLayout>
                      <Routes>
                        <Route path="/" element={<AdminPage />} />
                      </Routes>
                    </AdminLayout>
                  </AdminProtectedRoute>
                }
              />
            </Routes>
          </AdminAuthProvider>
        }
      />
    </Routes>
  );
}

export default App;
