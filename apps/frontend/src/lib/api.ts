const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string) => fetchApi<T>(endpoint),
  post: <T>(endpoint: string, data: unknown) =>
    fetchApi<T>(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: <T>(endpoint: string, data: unknown) =>
    fetchApi<T>(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: <T>(endpoint: string) => fetchApi<T>(endpoint, { method: 'DELETE' }),
};

export const kpiApi = {
  getAll: () => api.get('/api/kpis'),
  getById: (id: string) => api.get(`/api/kpis/${id}`),
  create: (data: unknown) => api.post('/api/kpis', data),
  update: (id: string, data: unknown) => api.put(`/api/kpis/${id}`, data),
  delete: (id: string) => api.delete(`/api/kpis/${id}`),
};

export const kpiSnapshotApi = {
  getAll: () => api.get('/api/kpi-snapshots'),
  getById: (id: string) => api.get(`/api/kpi-snapshots/${id}`),
  getByKpiId: (kpiId: string) => api.get(`/api/kpi-snapshots/kpi/${kpiId}`),
  create: (data: unknown) => api.post('/api/kpi-snapshots', data),
  update: (id: string, data: unknown) => api.put(`/api/kpi-snapshots/${id}`, data),
  delete: (id: string) => api.delete(`/api/kpi-snapshots/${id}`),
};

export const initiativeApi = {
  getAll: () => api.get('/api/initiatives'),
  getById: (id: string) => api.get(`/api/initiatives/${id}`),
  create: (data: unknown) => api.post('/api/initiatives', data),
  update: (id: string, data: unknown) => api.put(`/api/initiatives/${id}`, data),
  delete: (id: string) => api.delete(`/api/initiatives/${id}`),
};

export const companyAnalysisApi = {
  getAll: () => api.get('/api/company-analyses'),
  getById: (id: string) => api.get(`/api/company-analyses/${id}`),
  create: (data: unknown) => api.post('/api/company-analyses', data),
  update: (id: string, data: unknown) => api.put(`/api/company-analyses/${id}`, data),
  delete: (id: string) => api.delete(`/api/company-analyses/${id}`),
};

export const jobPostingApi = {
  getAll: () => api.get('/api/job-postings'),
  getById: (id: string) => api.get(`/api/job-postings/${id}`),
  create: (data: unknown) => api.post('/api/job-postings', data),
  update: (id: string, data: unknown) => api.put(`/api/job-postings/${id}`, data),
  delete: (id: string) => api.delete(`/api/job-postings/${id}`),
};

export const jobRoleApi = {
  getAll: () => api.get('/api/job-roles'),
  getById: (id: string) => api.get(`/api/job-roles/${id}`),
  create: (data: unknown) => api.post('/api/job-roles', data),
  update: (id: string, data: unknown) => api.put(`/api/job-roles/${id}`, data),
  delete: (id: string) => api.delete(`/api/job-roles/${id}`),
};

export const competitorJobApi = {
  getAll: () => api.get('/api/competitor-jobs'),
  getById: (id: string) => api.get(`/api/competitor-jobs/${id}`),
  create: (data: unknown) => api.post('/api/competitor-jobs', data),
  update: (id: string, data: unknown) => api.put(`/api/competitor-jobs/${id}`, data),
  delete: (id: string) => api.delete(`/api/competitor-jobs/${id}`),
};

export const organizationApi = {
  getAll: () => api.get('/api/organizations'),
  getById: (id: string) => api.get(`/api/organizations/${id}`),
  // create: (data: unknown) => api.post('/api/organizations', data), // 将来的にSaaS対応で必要
  update: (id: string, data: unknown) => api.put(`/api/organizations/${id}`, data),
  delete: (id: string) => api.delete(`/api/organizations/${id}`),
};

export const departmentApi = {
  getAll: () => api.get('/api/departments'),
  getById: (id: string) => api.get(`/api/departments/${id}`),
  create: (data: unknown) => api.post('/api/departments', data),
  update: (id: string, data: unknown) => api.put(`/api/departments/${id}`, data),
  delete: (id: string) => api.delete(`/api/departments/${id}`),
};

export const teamApi = {
  getAll: () => api.get('/api/teams'),
  getById: (id: string) => api.get(`/api/teams/${id}`),
  create: (data: unknown) => api.post('/api/teams', data),
  update: (id: string, data: unknown) => api.put(`/api/teams/${id}`, data),
  delete: (id: string) => api.delete(`/api/teams/${id}`),
};

export const positionApi = {
  getAll: () => api.get('/api/positions'),
  getById: (id: string) => api.get(`/api/positions/${id}`),
  create: (data: unknown) => api.post('/api/positions', data),
  update: (id: string, data: unknown) => api.put(`/api/positions/${id}`, data),
  delete: (id: string) => api.delete(`/api/positions/${id}`),
};

export const organizationMemberApi = {
  getAll: () => api.get('/api/organization-members'),
  getById: (id: string) => api.get(`/api/organization-members/${id}`),
  create: (data: unknown) => api.post('/api/organization-members', data),
  update: (id: string, data: unknown) => api.put(`/api/organization-members/${id}`, data),
  delete: (id: string) => api.delete(`/api/organization-members/${id}`),
};

export const selectionProcessApi = {
  getAll: () => api.get('/api/selection-processes'),
  getById: (id: string) => api.get(`/api/selection-processes/${id}`),
  create: (data: unknown) => api.post('/api/selection-processes', data),
  update: (id: string, data: unknown) => api.put(`/api/selection-processes/${id}`, data),
  delete: (id: string) => api.delete(`/api/selection-processes/${id}`),
};

export const recruitmentChannelApi = {
  getAll: () => api.get('/api/recruitment-channels'),
  getById: (id: string) => api.get(`/api/recruitment-channels/${id}`),
  create: (data: unknown) => api.post('/api/recruitment-channels', data),
  update: (id: string, data: unknown) => api.put(`/api/recruitment-channels/${id}`, data),
  delete: (id: string) => api.delete(`/api/recruitment-channels/${id}`),
};

export const faqApi = {
  getAll: () => api.get('/api/faqs'),
  getById: (id: string) => api.get(`/api/faqs/${id}`),
  create: (data: unknown) => api.post('/api/faqs', data),
  update: (id: string, data: unknown) => api.put(`/api/faqs/${id}`, data),
  delete: (id: string) => api.delete(`/api/faqs/${id}`),
};

export const faqCategoryApi = {
  getAll: () => api.get('/api/faq-categories'),
  getById: (id: string) => api.get(`/api/faq-categories/${id}`),
  create: (data: unknown) => api.post('/api/faq-categories', data),
  update: (id: string, data: unknown) => api.put(`/api/faq-categories/${id}`, data),
  delete: (id: string) => api.delete(`/api/faq-categories/${id}`),
};

export const historyApi = {
  getAll: (entityId?: string, entityType?: string) => {
    const params = new URLSearchParams();
    if (entityId) params.append('entityId', entityId);
    if (entityType) params.append('entityType', entityType);
    const query = params.toString();
    return api.get(`/api/history${query ? `?${query}` : ''}`);
  },
};
