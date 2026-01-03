import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FormField } from '../components/FormField';
import { jobPostingApi } from '../lib/api';

interface JobPosting {
  id: string;
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
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<JobPosting | null>(null);
  const [detailItem, setDetailItem] = useState<JobPosting | null>(null);
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

  const handleDetail = (item: JobPosting) => {
    setDetailItem(item);
    setDetailModalOpen(true);
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
        onDetail={handleDetail}
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

      {/* 詳細表示モーダル */}
      <Modal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        title="求人票詳細"
      >
        {detailItem && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ポジション名</label>
              <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{detailItem.positionName}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">募集背景</label>
              <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900 whitespace-pre-wrap min-h-[60px]">
                {detailItem.recruitmentBackground || '-'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">業務内容</label>
              <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900 whitespace-pre-wrap min-h-[60px]">
                {detailItem.jobDescription || '-'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">必須条件</label>
              <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900 whitespace-pre-wrap min-h-[60px]">
                {detailItem.requiredQualifications || '-'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">歓迎条件</label>
              <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900 whitespace-pre-wrap min-h-[60px]">
                {detailItem.preferredQualifications || '-'}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">給与</label>
                <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{detailItem.salary || '-'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">勤務地</label>
                <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{detailItem.workLocation || '-'}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">雇用形態</label>
                <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{detailItem.employmentType || '-'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ステータス</label>
                <div className="px-3 py-2">
                  {(() => {
                    const status = statusOptions.find((o) => o.value === detailItem.status);
                    const colorClass =
                      detailItem.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : detailItem.status === 'under_review'
                        ? 'bg-yellow-100 text-yellow-700'
                        : detailItem.status === 'closed'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700';
                    return (
                      <span className={`px-2 py-1 text-xs rounded-full ${colorClass}`}>
                        {status?.label || detailItem.status}
                      </span>
                    );
                  })()}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">備考</label>
              <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900 whitespace-pre-wrap min-h-[60px]">
                {detailItem.notes || '-'}
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setDetailModalOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                閉じる
              </button>
              <button
                type="button"
                onClick={() => {
                  setDetailModalOpen(false);
                  handleEdit(detailItem);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                編集
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
