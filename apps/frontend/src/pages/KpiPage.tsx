import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FormField } from '../components/FormField';
import { kpiApi } from '../lib/api';

interface Kpi {
  id: string;
  period: string;
  phase?: string;
  kpiType: string;
  targetValue: number;
  actualValue?: number;
  difference?: number;
  unit?: string;
  notes?: string;
}

const kpiTypeOptions = [
  { value: 'headcount', label: '人数KPI' },
  { value: 'conversion_rate', label: '歩留まりKPI' },
  { value: 'timeline', label: 'タイムラインKPI' },
];

const initialFormData = {
  period: '',
  phase: '',
  kpiType: 'headcount',
  targetValue: 0,
  actualValue: 0,
  unit: '',
  notes: '',
};

export function KpiPage() {
  const [kpis, setKpis] = useState<Kpi[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingKpi, setEditingKpi] = useState<Kpi | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  const fetchKpis = async () => {
    try {
      const data = await kpiApi.getAll() as Kpi[];
      setKpis(data);
    } catch (error) {
      console.error('Failed to fetch KPIs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKpis();
  }, []);

  const handleCreate = () => {
    setEditingKpi(null);
    setFormData(initialFormData);
    setModalOpen(true);
  };

  const handleEdit = (kpi: Kpi) => {
    setEditingKpi(kpi);
    setFormData({
      period: kpi.period,
      phase: kpi.phase || '',
      kpiType: kpi.kpiType,
      targetValue: kpi.targetValue,
      actualValue: kpi.actualValue || 0,
      unit: kpi.unit || '',
      notes: kpi.notes || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (kpi: Kpi) => {
    if (!confirm('このKPIを削除しますか？')) return;
    try {
      await kpiApi.delete(kpi.id);
      fetchKpis();
    } catch (error) {
      console.error('Failed to delete KPI:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingKpi) {
        await kpiApi.update(editingKpi.id, formData);
      } else {
        await kpiApi.create(formData);
      }
      setModalOpen(false);
      fetchKpis();
    } catch (error) {
      console.error('Failed to save KPI:', error);
    }
  };

  const columns = [
    { key: 'period', label: '期間' },
    { key: 'phase', label: 'フェーズ' },
    {
      key: 'kpiType',
      label: 'KPI種別',
      render: (kpi: Kpi) => kpiTypeOptions.find((o) => o.value === kpi.kpiType)?.label || kpi.kpiType,
    },
    { key: 'targetValue', label: '目標値' },
    { key: 'actualValue', label: '実績値' },
    {
      key: 'difference',
      label: '差分',
      render: (kpi: Kpi) => {
        if (kpi.actualValue === undefined) return '-';
        const diff = kpi.actualValue - kpi.targetValue;
        return (
          <span className={diff >= 0 ? 'text-green-600' : 'text-red-600'}>
            {diff >= 0 ? '+' : ''}{diff}
          </span>
        );
      },
    },
    { key: 'unit', label: '単位' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">KPI管理</h1>
      <DataTable
        data={kpis}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        title="KPI一覧"
        loading={loading}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingKpi ? 'KPI編集' : 'KPI新規作成'}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="期間"
            name="period"
            value={formData.period}
            onChange={(v) => setFormData({ ...formData, period: String(v) })}
            required
            placeholder="例: 2024年Q1"
          />
          <FormField
            label="フェーズ"
            name="phase"
            value={formData.phase}
            onChange={(v) => setFormData({ ...formData, phase: String(v) })}
            placeholder="例: 採用強化期"
          />
          <FormField
            label="KPI種別"
            name="kpiType"
            type="select"
            value={formData.kpiType}
            onChange={(v) => setFormData({ ...formData, kpiType: String(v) })}
            options={kpiTypeOptions}
            required
          />
          <FormField
            label="目標値"
            name="targetValue"
            type="number"
            value={formData.targetValue}
            onChange={(v) => setFormData({ ...formData, targetValue: Number(v) })}
            required
          />
          <FormField
            label="実績値"
            name="actualValue"
            type="number"
            value={formData.actualValue}
            onChange={(v) => setFormData({ ...formData, actualValue: Number(v) })}
          />
          <FormField
            label="単位"
            name="unit"
            value={formData.unit}
            onChange={(v) => setFormData({ ...formData, unit: String(v) })}
            placeholder="例: 人, %"
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
              {editingKpi ? '更新' : '作成'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
