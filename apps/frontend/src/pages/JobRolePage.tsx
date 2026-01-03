import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FormField } from '../components/FormField';
import { jobRoleApi } from '../lib/api';

interface JobRole {
  id: string;
  jobType: string;
  grade: string;
  mission?: string;
  specificTasks?: string;
  targetType?: string;
  notes?: string;
}

const targetTypeOptions = [
  { value: 'internal', label: '社内' },
  { value: 'agt', label: 'AGT' },
  { value: 'both', label: '両方' },
];

const initialFormData = {
  jobType: '',
  grade: '',
  mission: '',
  specificTasks: '',
  targetType: 'internal',
  notes: '',
};

export function JobRolePage() {
  const [items, setItems] = useState<JobRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<JobRole | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  const fetchData = async () => {
    try {
      const data = await jobRoleApi.getAll() as JobRole[];
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch job roles:', error);
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

  const handleEdit = (item: JobRole) => {
    setEditingItem(item);
    setFormData({
      jobType: item.jobType,
      grade: item.grade,
      mission: item.mission || '',
      specificTasks: item.specificTasks || '',
      targetType: item.targetType || 'internal',
      notes: item.notes || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (item: JobRole) => {
    if (!confirm('この業務・役割定義を削除しますか？')) return;
    try {
      await jobRoleApi.delete(item.id);
      fetchData();
    } catch (error) {
      console.error('Failed to delete job role:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await jobRoleApi.update(editingItem.id, formData);
      } else {
        await jobRoleApi.create(formData);
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Failed to save job role:', error);
    }
  };

  const columns = [
    { key: 'jobType', label: '職種' },
    { key: 'grade', label: 'グレード' },
    { key: 'mission', label: 'ミッション' },
    {
      key: 'targetType',
      label: '対象',
      render: (item: JobRole) => {
        const target = targetTypeOptions.find((o) => o.value === item.targetType);
        return target?.label || item.targetType || '-';
      },
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">業務・役割定義管理</h1>
      <DataTable
        data={items}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        title="業務・役割定義一覧"
        loading={loading}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? '業務・役割定義編集' : '業務・役割定義新規作成'}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="職種"
            name="jobType"
            value={formData.jobType}
            onChange={(v) => setFormData({ ...formData, jobType: String(v) })}
            required
          />
          <FormField
            label="グレード"
            name="grade"
            value={formData.grade}
            onChange={(v) => setFormData({ ...formData, grade: String(v) })}
            required
          />
          <FormField
            label="ミッション"
            name="mission"
            type="textarea"
            value={formData.mission}
            onChange={(v) => setFormData({ ...formData, mission: String(v) })}
          />
          <FormField
            label="具体業務"
            name="specificTasks"
            type="textarea"
            value={formData.specificTasks}
            onChange={(v) => setFormData({ ...formData, specificTasks: String(v) })}
          />
          <FormField
            label="対象"
            name="targetType"
            type="select"
            value={formData.targetType}
            onChange={(v) => setFormData({ ...formData, targetType: String(v) })}
            options={targetTypeOptions}
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
