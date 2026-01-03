import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FormField } from '../components/FormField';
import { companyAnalysisApi } from '../lib/api';

interface CompanyAnalysis {
  id: string;
  companyName: string;
  representative?: string;
  foundedDate?: string;
  employees?: string;
  address?: string;
  notes?: string;
}

const initialFormData = {
  companyName: '',
  representative: '',
  foundedDate: '',
  employees: '',
  address: '',
  notes: '',
};

export function CompanyAnalysisPage() {
  const [items, setItems] = useState<CompanyAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CompanyAnalysis | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  const fetchData = async () => {
    try {
      const data = await companyAnalysisApi.getAll() as CompanyAnalysis[];
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch company analyses:', error);
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

  const handleEdit = (item: CompanyAnalysis) => {
    setEditingItem(item);
    setFormData({
      companyName: item.companyName,
      representative: item.representative || '',
      foundedDate: item.foundedDate || '',
      employees: item.employees || '',
      address: item.address || '',
      notes: item.notes || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (item: CompanyAnalysis) => {
    if (!confirm('この企業分析を削除しますか？')) return;
    try {
      await companyAnalysisApi.delete(item.id);
      fetchData();
    } catch (error) {
      console.error('Failed to delete company analysis:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await companyAnalysisApi.update(editingItem.id, formData);
      } else {
        await companyAnalysisApi.create(formData);
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Failed to save company analysis:', error);
    }
  };

  const columns = [
    { key: 'companyName', label: '企業名' },
    { key: 'representative', label: '代表者' },
    { key: 'foundedDate', label: '設立日' },
    { key: 'employees', label: '従業員数' },
    { key: 'address', label: '所在地' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">企業・競合分析</h1>
      <DataTable
        data={items}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        title="企業分析一覧"
        loading={loading}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? '企業分析編集' : '企業分析新規作成'}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="企業名"
            name="companyName"
            value={formData.companyName}
            onChange={(v) => setFormData({ ...formData, companyName: String(v) })}
            required
          />
          <FormField
            label="代表者"
            name="representative"
            value={formData.representative}
            onChange={(v) => setFormData({ ...formData, representative: String(v) })}
          />
          <FormField
            label="設立日"
            name="foundedDate"
            value={formData.foundedDate}
            onChange={(v) => setFormData({ ...formData, foundedDate: String(v) })}
          />
          <FormField
            label="従業員数"
            name="employees"
            value={formData.employees}
            onChange={(v) => setFormData({ ...formData, employees: String(v) })}
          />
          <FormField
            label="所在地"
            name="address"
            value={formData.address}
            onChange={(v) => setFormData({ ...formData, address: String(v) })}
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
