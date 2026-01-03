import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FormField } from '../components/FormField';
import { selectionProcessApi } from '../lib/api';

interface SelectionProcess {
  id: string;
  stepNo: number;
  phaseName: string;
  detailedProcess?: string;
  owner?: string;
  requiredDays?: number;
  processType: string;
  notes?: string;
}

const processTypeOptions = [
  { value: 'current', label: '現状' },
  { value: 'ideal', label: '理想' },
];

const initialFormData = {
  stepNo: 1,
  phaseName: '',
  detailedProcess: '',
  owner: '',
  requiredDays: 0,
  processType: 'current',
  notes: '',
};

export function SelectionProcessPage() {
  const [items, setItems] = useState<SelectionProcess[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SelectionProcess | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  const fetchData = async () => {
    try {
      const data = await selectionProcessApi.getAll() as SelectionProcess[];
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch selection processes:', error);
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

  const handleEdit = (item: SelectionProcess) => {
    setEditingItem(item);
    setFormData({
      stepNo: item.stepNo,
      phaseName: item.phaseName,
      detailedProcess: item.detailedProcess || '',
      owner: item.owner || '',
      requiredDays: item.requiredDays || 0,
      processType: item.processType,
      notes: item.notes || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (item: SelectionProcess) => {
    if (!confirm('この選考プロセスを削除しますか？')) return;
    try {
      await selectionProcessApi.delete(item.id);
      fetchData();
    } catch (error) {
      console.error('Failed to delete selection process:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await selectionProcessApi.update(editingItem.id, formData);
      } else {
        await selectionProcessApi.create(formData);
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Failed to save selection process:', error);
    }
  };

  const columns = [
    { key: 'stepNo', label: 'ステップNo' },
    { key: 'phaseName', label: 'フェーズ名' },
    { key: 'detailedProcess', label: '詳細プロセス' },
    { key: 'owner', label: '担当' },
    { key: 'requiredDays', label: '所要日数' },
    {
      key: 'processType',
      label: 'タイプ',
      render: (item: SelectionProcess) => {
        const type = processTypeOptions.find((o) => o.value === item.processType);
        const colorClass =
          item.processType === 'current' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700';
        return (
          <span className={`px-2 py-1 text-xs rounded-full ${colorClass}`}>
            {type?.label || item.processType}
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">選考プロセス管理</h1>
      <DataTable
        data={items}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        title="選考プロセス一覧"
        loading={loading}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? '選考プロセス編集' : '選考プロセス新規作成'}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="ステップNo"
            name="stepNo"
            type="number"
            value={formData.stepNo}
            onChange={(v) => setFormData({ ...formData, stepNo: Number(v) })}
            required
          />
          <FormField
            label="フェーズ名"
            name="phaseName"
            value={formData.phaseName}
            onChange={(v) => setFormData({ ...formData, phaseName: String(v) })}
            required
          />
          <FormField
            label="詳細プロセス"
            name="detailedProcess"
            type="textarea"
            value={formData.detailedProcess}
            onChange={(v) => setFormData({ ...formData, detailedProcess: String(v) })}
          />
          <FormField
            label="担当"
            name="owner"
            value={formData.owner}
            onChange={(v) => setFormData({ ...formData, owner: String(v) })}
          />
          <FormField
            label="所要日数"
            name="requiredDays"
            type="number"
            value={formData.requiredDays}
            onChange={(v) => setFormData({ ...formData, requiredDays: Number(v) })}
          />
          <FormField
            label="タイプ"
            name="processType"
            type="select"
            value={formData.processType}
            onChange={(v) => setFormData({ ...formData, processType: String(v) })}
            options={processTypeOptions}
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
