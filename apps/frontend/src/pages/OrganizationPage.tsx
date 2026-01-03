import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FormField } from '../components/FormField';
import { organizationApi } from '../lib/api';

interface Organization {
  id: string;
  department: string;
  role?: string;
  headcount?: number;
  notes?: string;
}

const initialFormData = {
  department: '',
  role: '',
  headcount: 0,
  notes: '',
};

export function OrganizationPage() {
  const [items, setItems] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Organization | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  const fetchData = async () => {
    try {
      const data = await organizationApi.getAll() as Organization[];
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
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

  const handleEdit = (item: Organization) => {
    setEditingItem(item);
    setFormData({
      department: item.department,
      role: item.role || '',
      headcount: item.headcount || 0,
      notes: item.notes || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (item: Organization) => {
    if (!confirm('この組織情報を削除しますか？')) return;
    try {
      await organizationApi.delete(item.id);
      fetchData();
    } catch (error) {
      console.error('Failed to delete organization:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await organizationApi.update(editingItem.id, formData);
      } else {
        await organizationApi.create(formData);
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Failed to save organization:', error);
    }
  };

  const columns = [
    { key: 'department', label: '部署' },
    { key: 'role', label: '役割' },
    { key: 'headcount', label: '人員数' },
    { key: 'notes', label: '備考' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">組織・体制管理</h1>
      <DataTable
        data={items}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        title="組織一覧"
        loading={loading}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? '組織情報編集' : '組織情報新規作成'}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="部署"
            name="department"
            value={formData.department}
            onChange={(v) => setFormData({ ...formData, department: String(v) })}
            required
          />
          <FormField
            label="役割"
            name="role"
            value={formData.role}
            onChange={(v) => setFormData({ ...formData, role: String(v) })}
          />
          <FormField
            label="人員数"
            name="headcount"
            type="number"
            value={formData.headcount}
            onChange={(v) => setFormData({ ...formData, headcount: Number(v) })}
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
