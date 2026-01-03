import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FormField } from '../components/FormField';
import { jobPostingApi } from '../lib/api';

interface JobPosting {
  id: string;
  jobId: string;
  positionName: string;
  recruitmentBackground?: string;
  jobDescription?: string;
  requiredQualifications?: string;
  preferredQualifications?: string;
  salary?: string;
  workLocation?: string;
  employmentType?: string;
  status: string;
  notes?: string;
}

const statusOptions = [
  { value: 'draft', label: '下書き' },
  { value: 'under_review', label: '検討中' },
  { value: 'published', label: '公開中' },
  { value: 'closed', label: 'クローズ' },
];

const initialFormData = {
  jobId: '',
  positionName: '',
  recruitmentBackground: '',
  jobDescription: '',
  requiredQualifications: '',
  preferredQualifications: '',
  salary: '',
  workLocation: '',
  employmentType: '',
  status: 'draft',
  notes: '',
};

export function JobPostingPage() {
  const [items, setItems] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<JobPosting | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  const fetchData = async () => {
    try {
      const data = await jobPostingApi.getAll() as JobPosting[];
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch job postings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = () => {
    setEditingItem(null);
    setFormData(initialFormData);
    setModalOpen(true);
  };

  const handleEdit = (item: JobPosting) => {
    setEditingItem(item);
    setFormData({
      jobId: item.jobId,
      positionName: item.positionName,
      recruitmentBackground: item.recruitmentBackground || '',
      jobDescription: item.jobDescription || '',
      requiredQualifications: item.requiredQualifications || '',
      preferredQualifications: item.preferredQualifications || '',
      salary: item.salary || '',
      workLocation: item.workLocation || '',
      employmentType: item.employmentType || '',
      status: item.status,
      notes: item.notes || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (item: JobPosting) => {
    if (!confirm('この求人票を削除しますか？')) return;
    try {
      await jobPostingApi.delete(item.id);
      fetchData();
    } catch (error) {
      console.error('Failed to delete job posting:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await jobPostingApi.update(editingItem.id, formData);
      } else {
        await jobPostingApi.create(formData);
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Failed to save job posting:', error);
    }
  };

  const columns = [
    { key: 'jobId', label: '求人ID' },
    { key: 'positionName', label: 'ポジション名' },
    { key: 'workLocation', label: '勤務地' },
    { key: 'employmentType', label: '雇用形態' },
    {
      key: 'status',
      label: 'ステータス',
      render: (item: JobPosting) => {
        const status = statusOptions.find((o) => o.value === item.status);
        const colorClass =
          item.status === 'published'
            ? 'bg-green-100 text-green-700'
            : item.status === 'under_review'
            ? 'bg-yellow-100 text-yellow-700'
            : item.status === 'closed'
            ? 'bg-red-100 text-red-700'
            : 'bg-gray-100 text-gray-700';
        return (
          <span className={`px-2 py-1 text-xs rounded-full ${colorClass}`}>
            {status?.label || item.status}
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">求人票管理</h1>
      <DataTable
        data={items}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        title="求人票一覧"
        loading={loading}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? '求人票編集' : '求人票新規作成'}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="求人ID"
            name="jobId"
            value={formData.jobId}
            onChange={(v) => setFormData({ ...formData, jobId: String(v) })}
            required
          />
          <FormField
            label="ポジション名"
            name="positionName"
            value={formData.positionName}
            onChange={(v) => setFormData({ ...formData, positionName: String(v) })}
            required
          />
          <FormField
            label="募集背景"
            name="recruitmentBackground"
            type="textarea"
            value={formData.recruitmentBackground}
            onChange={(v) => setFormData({ ...formData, recruitmentBackground: String(v) })}
          />
          <FormField
            label="業務内容"
            name="jobDescription"
            type="textarea"
            value={formData.jobDescription}
            onChange={(v) => setFormData({ ...formData, jobDescription: String(v) })}
          />
          <FormField
            label="必須条件"
            name="requiredQualifications"
            type="textarea"
            value={formData.requiredQualifications}
            onChange={(v) => setFormData({ ...formData, requiredQualifications: String(v) })}
          />
          <FormField
            label="歓迎条件"
            name="preferredQualifications"
            type="textarea"
            value={formData.preferredQualifications}
            onChange={(v) => setFormData({ ...formData, preferredQualifications: String(v) })}
          />
          <FormField
            label="給与"
            name="salary"
            value={formData.salary}
            onChange={(v) => setFormData({ ...formData, salary: String(v) })}
          />
          <FormField
            label="勤務地"
            name="workLocation"
            value={formData.workLocation}
            onChange={(v) => setFormData({ ...formData, workLocation: String(v) })}
          />
          <FormField
            label="雇用形態"
            name="employmentType"
            value={formData.employmentType}
            onChange={(v) => setFormData({ ...formData, employmentType: String(v) })}
          />
          <FormField
            label="ステータス"
            name="status"
            type="select"
            value={formData.status}
            onChange={(v) => setFormData({ ...formData, status: String(v) })}
            options={statusOptions}
            required
          />
          <FormField
            label="備考"
            name="notes"
            type="textarea"
            value={formData.notes}
            onChange={(v) => setFormData({ ...formData, notes: String(v) })}
          />
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingItem ? '更新' : '作成'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
