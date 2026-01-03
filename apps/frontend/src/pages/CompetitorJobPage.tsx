import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FormField } from '../components/FormField';
import { competitorJobApi } from '../lib/api';

interface CompetitorJob {
  id: string;
  companyName: string;
  position: string;
  jobUrl?: string;
  highlightPoints?: string;
  salary?: string;
  jobDescription?: string;
  requirements?: string;
  notes?: string;
}

const initialFormData = {
  companyName: '',
  position: '',
  jobUrl: '',
  highlightPoints: '',
  salary: '',
  jobDescription: '',
  requirements: '',
  notes: '',
};

export function CompetitorJobPage() {
  const [items, setItems] = useState<CompetitorJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CompetitorJob | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  const fetchData = async () => {
    try {
      const data = await competitorJobApi.getAll() as CompetitorJob[];
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch competitor jobs:', error);
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

  const handleEdit = (item: CompetitorJob) => {
    setEditingItem(item);
    setFormData({
      companyName: item.companyName,
      position: item.position,
      jobUrl: item.jobUrl || '',
      highlightPoints: item.highlightPoints || '',
      salary: item.salary || '',
      jobDescription: item.jobDescription || '',
      requirements: item.requirements || '',
      notes: item.notes || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (item: CompetitorJob) => {
    if (!confirm('この他社求人を削除しますか？')) return;
    try {
      await competitorJobApi.delete(item.id);
      fetchData();
    } catch (error) {
      console.error('Failed to delete competitor job:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await competitorJobApi.update(editingItem.id, formData);
      } else {
        await competitorJobApi.create(formData);
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Failed to save competitor job:', error);
    }
  };

  const columns = [
    { key: 'companyName', label: '企業名' },
    { key: 'position', label: 'ポジション' },
    {
      key: 'jobUrl',
      label: 'URL',
      render: (item: CompetitorJob) =>
        item.jobUrl ? (
          <a
            href={item.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <ExternalLink size={14} />
            <span>リンク</span>
          </a>
        ) : (
          '-'
        ),
    },
    { key: 'salary', label: '給与' },
    { key: 'highlightPoints', label: '注目ポイント' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">他社求人・ベンチマーク管理</h1>
      <DataTable
        data={items}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        title="他社求人一覧"
        loading={loading}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? '他社求人編集' : '他社求人新規作成'}
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
            label="ポジション"
            name="position"
            value={formData.position}
            onChange={(v) => setFormData({ ...formData, position: String(v) })}
            required
          />
          <FormField
            label="求人URL"
            name="jobUrl"
            value={formData.jobUrl}
            onChange={(v) => setFormData({ ...formData, jobUrl: String(v) })}
            placeholder="https://..."
          />
          <FormField
            label="注目ポイント"
            name="highlightPoints"
            type="textarea"
            value={formData.highlightPoints}
            onChange={(v) => setFormData({ ...formData, highlightPoints: String(v) })}
          />
          <FormField
            label="給与"
            name="salary"
            value={formData.salary}
            onChange={(v) => setFormData({ ...formData, salary: String(v) })}
          />
          <FormField
            label="業務内容"
            name="jobDescription"
            type="textarea"
            value={formData.jobDescription}
            onChange={(v) => setFormData({ ...formData, jobDescription: String(v) })}
          />
          <FormField
            label="応募要件"
            name="requirements"
            type="textarea"
            value={formData.requirements}
            onChange={(v) => setFormData({ ...formData, requirements: String(v) })}
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
