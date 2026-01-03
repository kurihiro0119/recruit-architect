import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FormField } from '../components/FormField';
import { faqApi } from '../lib/api';

interface Faq {
  id: string;
  category: string;
  question: string;
  answer: string;
  visibility: string;
  order?: number;
  notes?: string;
}

const visibilityOptions = [
  { value: 'internal', label: '社内' },
  { value: 'agt', label: 'AGT' },
  { value: 'public', label: '公開' },
];

const initialFormData = {
  category: '',
  question: '',
  answer: '',
  visibility: 'internal',
  order: 0,
  notes: '',
};

export function FaqPage() {
  const [items, setItems] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Faq | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  const fetchData = async () => {
    try {
      const data = await faqApi.getAll() as Faq[];
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
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

  const handleEdit = (item: Faq) => {
    setEditingItem(item);
    setFormData({
      category: item.category,
      question: item.question,
      answer: item.answer,
      visibility: item.visibility,
      order: item.order || 0,
      notes: item.notes || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (item: Faq) => {
    if (!confirm('このFAQを削除しますか？')) return;
    try {
      await faqApi.delete(item.id);
      fetchData();
    } catch (error) {
      console.error('Failed to delete FAQ:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await faqApi.update(editingItem.id, formData);
      } else {
        await faqApi.create(formData);
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Failed to save FAQ:', error);
    }
  };

  const columns = [
    { key: 'category', label: 'カテゴリ' },
    { key: 'question', label: '質問' },
    {
      key: 'answer',
      label: '回答',
      render: (item: Faq) => (
        <span className="truncate max-w-xs block">{item.answer.substring(0, 50)}...</span>
      ),
    },
    {
      key: 'visibility',
      label: '公開範囲',
      render: (item: Faq) => {
        const visibility = visibilityOptions.find((o) => o.value === item.visibility);
        const colorClass =
          item.visibility === 'public'
            ? 'bg-green-100 text-green-700'
            : item.visibility === 'agt'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-700';
        return (
          <span className={`px-2 py-1 text-xs rounded-full ${colorClass}`}>
            {visibility?.label || item.visibility}
          </span>
        );
      },
    },
    { key: 'order', label: '順序' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">FAQ管理</h1>
      <DataTable
        data={items}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        title="FAQ一覧"
        loading={loading}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'FAQ編集' : 'FAQ新規作成'}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="カテゴリ"
            name="category"
            value={formData.category}
            onChange={(v) => setFormData({ ...formData, category: String(v) })}
            required
          />
          <FormField
            label="質問"
            name="question"
            type="textarea"
            value={formData.question}
            onChange={(v) => setFormData({ ...formData, question: String(v) })}
            required
          />
          <FormField
            label="回答"
            name="answer"
            type="textarea"
            value={formData.answer}
            onChange={(v) => setFormData({ ...formData, answer: String(v) })}
            required
          />
          <FormField
            label="公開範囲"
            name="visibility"
            type="select"
            value={formData.visibility}
            onChange={(v) => setFormData({ ...formData, visibility: String(v) })}
            options={visibilityOptions}
            required
          />
          <FormField
            label="順序"
            name="order"
            type="number"
            value={formData.order}
            onChange={(v) => setFormData({ ...formData, order: Number(v) })}
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
