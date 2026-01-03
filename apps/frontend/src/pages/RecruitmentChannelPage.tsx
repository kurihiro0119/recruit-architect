import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FormField } from '../components/FormField';
import { recruitmentChannelApi } from '../lib/api';

interface RecruitmentChannel {
  id: string;
  channelName: string;
  characteristics?: string;
  targetJobTypes?: string[];
  cost?: string;
  effectiveness?: string;
  notes?: string;
}

const initialFormData = {
  channelName: '',
  characteristics: '',
  targetJobTypes: '',
  cost: '',
  effectiveness: '',
  notes: '',
};

export function RecruitmentChannelPage() {
  const [items, setItems] = useState<RecruitmentChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RecruitmentChannel | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  const fetchData = async () => {
    try {
      const data = await recruitmentChannelApi.getAll() as RecruitmentChannel[];
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch recruitment channels:', error);
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

  const handleEdit = (item: RecruitmentChannel) => {
    setEditingItem(item);
    setFormData({
      channelName: item.channelName,
      characteristics: item.characteristics || '',
      targetJobTypes: item.targetJobTypes?.join(', ') || '',
      cost: item.cost || '',
      effectiveness: item.effectiveness || '',
      notes: item.notes || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (item: RecruitmentChannel) => {
    if (!confirm('この採用チャネルを削除しますか？')) return;
    try {
      await recruitmentChannelApi.delete(item.id);
      fetchData();
    } catch (error) {
      console.error('Failed to delete recruitment channel:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        targetJobTypes: formData.targetJobTypes
          ? formData.targetJobTypes.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
      };
      if (editingItem) {
        await recruitmentChannelApi.update(editingItem.id, submitData);
      } else {
        await recruitmentChannelApi.create(submitData);
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Failed to save recruitment channel:', error);
    }
  };

  const columns = [
    { key: 'channelName', label: 'チャネル名' },
    { key: 'characteristics', label: '特徴' },
    {
      key: 'targetJobTypes',
      label: '対象職種',
      render: (item: RecruitmentChannel) => item.targetJobTypes?.join(', ') || '-',
    },
    { key: 'cost', label: 'コスト' },
    { key: 'effectiveness', label: '効果' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">採用チャネル管理</h1>
      <DataTable
        data={items}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        title="採用チャネル一覧"
        loading={loading}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? '採用チャネル編集' : '採用チャネル新規作成'}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="チャネル名"
            name="channelName"
            value={formData.channelName}
            onChange={(v) => setFormData({ ...formData, channelName: String(v) })}
            required
          />
          <FormField
            label="特徴"
            name="characteristics"
            type="textarea"
            value={formData.characteristics}
            onChange={(v) => setFormData({ ...formData, characteristics: String(v) })}
          />
          <FormField
            label="対象職種（カンマ区切り）"
            name="targetJobTypes"
            value={formData.targetJobTypes}
            onChange={(v) => setFormData({ ...formData, targetJobTypes: String(v) })}
            placeholder="例: エンジニア, デザイナー, PM"
          />
          <FormField
            label="コスト"
            name="cost"
            value={formData.cost}
            onChange={(v) => setFormData({ ...formData, cost: String(v) })}
          />
          <FormField
            label="効果"
            name="effectiveness"
            value={formData.effectiveness}
            onChange={(v) => setFormData({ ...formData, effectiveness: String(v) })}
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
