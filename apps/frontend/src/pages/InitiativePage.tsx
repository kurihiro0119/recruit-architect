import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FormField } from '../components/FormField';
import { initiativeApi } from '../lib/api';

interface Initiative {
  id: string;
  timing: string;
  schedule?: string;
  milestone: string;
  mainOwner: string;
  outputAndGoal: string;
  status?: string;
  notes?: string;
}

const statusOptions = [
  { value: 'planned', label: '計画中' },
  { value: 'in_progress', label: '進行中' },
  { value: 'completed', label: '完了' },
  { value: 'on_hold', label: '保留' },
];

const initialFormData = {
  timing: '',
  schedule: '',
  milestone: '',
  mainOwner: '',
  outputAndGoal: '',
  status: 'planned',
  notes: '',
};

export function InitiativePage() {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Initiative | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  const fetchData = async () => {
    try {
      const data = await initiativeApi.getAll() as Initiative[];
      setInitiatives(data);
    } catch (error) {
      console.error('Failed to fetch initiatives:', error);
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

  const handleEdit = (item: Initiative) => {
    setEditingItem(item);
    setFormData({
      timing: item.timing,
      schedule: item.schedule || '',
      milestone: item.milestone,
      mainOwner: item.mainOwner,
      outputAndGoal: item.outputAndGoal,
      status: item.status || 'planned',
      notes: item.notes || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (item: Initiative) => {
    if (!confirm('この施策を削除しますか？')) return;
    try {
      await initiativeApi.delete(item.id);
      fetchData();
    } catch (error) {
      console.error('Failed to delete initiative:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await initiativeApi.update(editingItem.id, formData);
      } else {
        await initiativeApi.create(formData);
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Failed to save initiative:', error);
    }
  };

  const columns = [
    { key: 'timing', label: '時期' },
    { key: 'schedule', label: '日程' },
    { key: 'milestone', label: 'マイルストーン' },
    { key: 'mainOwner', label: '主担当' },
    { key: 'outputAndGoal', label: 'アウトプットとゴール' },
    {
      key: 'status',
      label: 'ステータス',
      render: (item: Initiative) => {
        const status = statusOptions.find((o) => o.value === item.status);
        const colorClass =
          item.status === 'in_progress'
            ? 'bg-blue-100 text-blue-700'
            : item.status === 'completed'
            ? 'bg-green-100 text-green-700'
            : item.status === 'on_hold'
            ? 'bg-yellow-100 text-yellow-700'
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">採用施策管理</h1>
      <DataTable
        data={initiatives}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        title="施策一覧"
        loading={loading}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? '施策編集' : '施策新規作成'}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="時期"
            name="timing"
            value={formData.timing}
            onChange={(v) => setFormData({ ...formData, timing: String(v) })}
            required
            placeholder="例: 導入準備"
          />
          <FormField
            label="日程"
            name="schedule"
            value={formData.schedule}
            onChange={(v) => setFormData({ ...formData, schedule: String(v) })}
            placeholder="例: 7/1 (火) 〜7/4 (金)"
          />
          <FormField
            label="マイルストーン"
            name="milestone"
            value={formData.milestone}
            onChange={(v) => setFormData({ ...formData, milestone: String(v) })}
            required
            placeholder="例: 契約締結・環境準備"
          />
          <FormField
            label="主担当"
            name="mainOwner"
            value={formData.mainOwner}
            onChange={(v) => setFormData({ ...formData, mainOwner: String(v) })}
            required
            placeholder="例: VP・人事担当・RPO"
          />
          <FormField
            label="アウトプットとゴール"
            name="outputAndGoal"
            type="textarea"
            value={formData.outputAndGoal}
            onChange={(v) => setFormData({ ...formData, outputAndGoal: String(v) })}
            required
          />
          <FormField
            label="ステータス"
            name="status"
            type="select"
            value={formData.status}
            onChange={(v) => setFormData({ ...formData, status: String(v) })}
            options={statusOptions}
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
