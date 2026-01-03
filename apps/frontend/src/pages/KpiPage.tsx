import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FormField } from '../components/FormField';
import { kpiApi, kpiSnapshotApi } from '../lib/api';

interface PhaseData {
  phaseName: string;
  targetValue?: number;
  actualValue?: number;
}

interface Kpi {
  id: string;
  periodStart: string;
  periodEnd: string;
  phase?: string;
  notes?: string;
  phaseData?: PhaseData[];
}

const defaultPhases = [
  'エントリー',
  '書類通過',
  'カジュアル面談',
  '一次面接',
  '二次面接',
  '最終面接',
  '内定',
  '承諾',
];

const initialFormData = {
  periodStart: '',
  periodEnd: '',
  phase: '',
  notes: '',
  phaseData: defaultPhases.map((phaseName) => ({
    phaseName,
    targetValue: undefined,
    actualValue: undefined,
  })),
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
    const existingPhaseData = kpi.phaseData || [];
    const phaseDataMap = new Map(existingPhaseData.map((pd) => [pd.phaseName, pd]));
    setFormData({
      periodStart: kpi.periodStart,
      periodEnd: kpi.periodEnd,
      phase: kpi.phase || '',
      notes: kpi.notes || '',
      phaseData: defaultPhases.map((phaseName) => {
        const existing = phaseDataMap.get(phaseName);
        return {
          phaseName,
          targetValue: existing?.targetValue,
          actualValue: existing?.actualValue,
        };
      }),
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
      // phaseDataから空のエントリを除外
      const filteredPhaseData = formData.phaseData?.filter(
        (pd) => pd.targetValue !== undefined || pd.actualValue !== undefined
      );
      const submitData = {
        ...formData,
        phaseData: filteredPhaseData && filteredPhaseData.length > 0 ? filteredPhaseData : undefined,
      };

      if (editingKpi) {
        await kpiApi.update(editingKpi.id, submitData);
      } else {
        await kpiApi.create(submitData);
      }
      setModalOpen(false);
      fetchKpis();
    } catch (error) {
      console.error('Failed to save KPI:', error);
    }
  };

  // 進捗状況を計算する関数
  const calculateProgress = (kpi: Kpi) => {
    if (!kpi.phaseData || kpi.phaseData.length === 0) return null;
    
    const phases = kpi.phaseData;
    const result: { phaseName: string; count: number; conversionRate?: number }[] = [];
    
    for (let i = 0; i < phases.length; i++) {
      const phase = phases[i];
      const actualValue = phase.actualValue ?? 0;
      result.push({
        phaseName: phase.phaseName,
        count: actualValue,
        conversionRate: i > 0 && phases[i - 1].actualValue 
          ? (actualValue / phases[i - 1].actualValue) * 100 
          : undefined,
      });
    }
    
    return result;
  };

  const columns = [
    {
      key: 'period',
      label: '期間',
      render: (kpi: Kpi) => {
        const start = new Date(kpi.periodStart).toLocaleDateString('ja-JP');
        const end = new Date(kpi.periodEnd).toLocaleDateString('ja-JP');
        return `${start} ～ ${end}`;
      },
    },
    { key: 'phase', label: 'フェーズ' },
    {
      key: 'progress',
      label: '進捗状況',
      render: (kpi: Kpi) => {
        const progress = calculateProgress(kpi);
        if (!progress || progress.length === 0) return '-';
        
        // 主要なフェーズのみ表示（エントリー、書類通過、一次面接、最終面接、内定、承諾）
        const keyPhases = ['エントリー', '書類通過', '一次面接', '最終面接', '内定', '承諾'];
        const displayPhases = progress.filter(p => keyPhases.includes(p.phaseName));
        
        return (
          <div className="flex gap-2 text-xs">
            {displayPhases.map((p, idx) => (
              <div key={p.phaseName} className="flex flex-col items-center">
                <span className="font-medium">{p.count}</span>
                {p.conversionRate !== undefined && (
                  <span className="text-gray-500">{p.conversionRate.toFixed(0)}%</span>
                )}
              </div>
            ))}
          </div>
        );
      },
    },
  ];

  const handleDetail = (kpi: Kpi) => {
    window.location.href = `/kpis/${kpi.id}`;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">KPI管理</h1>
      <DataTable
        data={kpis}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetail={handleDetail}
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              期間 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">開始日</label>
                <input
                  type="date"
                  value={formData.periodStart}
                  onChange={(e) => setFormData({ ...formData, periodStart: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">終了日</label>
                <input
                  type="date"
                  value={formData.periodEnd}
                  onChange={(e) => setFormData({ ...formData, periodEnd: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  min={formData.periodStart}
                />
              </div>
            </div>
          </div>
          <FormField
            label="フェーズ"
            name="phase"
            value={formData.phase}
            onChange={(v) => setFormData({ ...formData, phase: String(v) })}
            placeholder="例: 採用強化期"
          />
          <FormField
            label="備考"
            name="notes"
            type="textarea"
            value={formData.notes}
            onChange={(v) => setFormData({ ...formData, notes: String(v) })}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              フェーズごとの目標・実績
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-b">
                      フェーズ
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-b">
                      目標値
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-b">
                      実績値
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {formData.phaseData?.map((phase, index) => (
                    <tr key={phase.phaseName}>
                      <td className="px-3 py-2 text-sm text-gray-900">
                        {phase.phaseName}
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          value={phase.targetValue ?? ''}
                          onChange={(e) => {
                            const newPhaseData = [...(formData.phaseData || [])];
                            newPhaseData[index] = {
                              ...phase,
                              targetValue: e.target.value ? Number(e.target.value) : undefined,
                            };
                            setFormData({ ...formData, phaseData: newPhaseData });
                          }}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          value={phase.actualValue ?? ''}
                          onChange={(e) => {
                            const newPhaseData = [...(formData.phaseData || [])];
                            newPhaseData[index] = {
                              ...phase,
                              actualValue: e.target.value ? Number(e.target.value) : undefined,
                            };
                            setFormData({ ...formData, phaseData: newPhaseData });
                          }}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

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
