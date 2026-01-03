import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { KpiPage } from './pages/KpiPage';
import { InitiativePage } from './pages/InitiativePage';
import { CompanyAnalysisPage } from './pages/CompanyAnalysisPage';
import { JobPostingPage } from './pages/JobPostingPage';
import { JobRolePage } from './pages/JobRolePage';
import { CompetitorJobPage } from './pages/CompetitorJobPage';
import { OrganizationPage } from './pages/OrganizationPage';
import { SelectionProcessPage } from './pages/SelectionProcessPage';
import { RecruitmentChannelPage } from './pages/RecruitmentChannelPage';
import { FaqPage } from './pages/FaqPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/kpis" element={<KpiPage />} />
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
  );
}

export default App;
