import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

interface KpiSnapshot {
  id: string;
  kpiId: string;
  snapshotDate: string;
  phaseData?: PhaseData[];
  comments?: string;
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

export function KpiDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [kpi, setKpi] = useState<Kpi | null>(null);
  const [snapshots, setSnapshots] = useState<KpiSnapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [snapshotDate, setSnapshotDate] = useState(new Date().toISOString().split('T')[0]);
  const [snapshotPhaseData, setSnapshotPhaseData] = useState<PhaseData[]>(
    defaultPhases.map((phaseName) => ({
      phaseName,
      targetValue: undefined,
      actualValue: undefined,
    }))
  );

  useEffect(() => {
    if (id) {
      fetchKpi();
      fetchSnapshots();
    }
  }, [id]);

  const fetchKpi = async () => {
    try {
      const data = await kpiApi.getById(id!) as Kpi;
      setKpi(data);
      // KPIの最新データをスナップショットの初期値として設定
      if (data.phaseData) {
        const phaseDataMap = new Map(data.phaseData.map((pd) => [pd.phaseName, pd]));
        setSnapshotPhaseData(
          defaultPhases.map((phaseName) => {
            const existing = phaseDataMap.get(phaseName);
            return {
              phaseName,
              targetValue: existing?.targetValue,
              actualValue: existing?.actualValue,
            };
          })
        );
      }
    } catch (error) {
      console.error('Failed to fetch KPI:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSnapshots = async () => {
    try {
      const data = await kpiSnapshotApi.getByKpiId(id!) as KpiSnapshot[];
      setSnapshots(data.sort((a, b) => 
        new Date(b.snapshotDate).getTime() - new Date(a.snapshotDate).getTime()
      ));
    } catch (error) {
      console.error('Failed to fetch snapshots:', error);
    }
  };

  const handleSaveSnapshot = async () => {
    if (!id) return;
    
    try {
      const filteredPhaseData = snapshotPhaseData.filter(
        (pd) => pd.targetValue !== undefined || pd.actualValue !== undefined
      );
      
      await kpiSnapshotApi.create({
        kpiId: id,
        snapshotDate,
        phaseData: filteredPhaseData.length > 0 ? filteredPhaseData : undefined,
      });
      
      fetchSnapshots();
      alert('スナップショットを保存しました');
    } catch (error) {
      console.error('Failed to save snapshot:', error);
      alert('スナップショットの保存に失敗しました');
    }
  };

  const getStatusSymbol = (target?: number, actual?: number) => {
    if (target === undefined || actual === undefined) return '-';
    const ratio = actual / target;
    if (ratio >= 1.0) return '◎';
    if (ratio >= 0.8) return '△';
    return '×';
  };

  const getStatusColor = (target?: number, actual?: number) => {
    if (target === undefined || actual === undefined) return 'text-gray-500';
    const ratio = actual / target;
    if (ratio >= 1.0) return 'text-green-600';
    if (ratio >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return <div className="p-8 text-center">読み込み中...</div>;
  }

  if (!kpi) {
    return <div className="p-8 text-center">KPIが見つかりません</div>;
  }

  // タイムラインデータを生成（期間を日付ごとに分割）
  const generateTimelineData = () => {
    const start = new Date(kpi.periodStart);
    const end = new Date(kpi.periodEnd);
    const dates: string[] = [];
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d).toISOString().split('T')[0]);
    }
    
    // マイルストーンデート（月末など）
    const milestones = [
      new Date(start).toISOString().split('T')[0],
      new Date(end).toISOString().split('T')[0],
    ];
    
    return { dates, milestones };
  };

  const { dates, milestones } = generateTimelineData();
  const keyPhases = ['エントリー', '書類通過', '一次面接', '最終面接', '内定', '承諾'];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/kpis')}
            className="text-gray-600 hover:text-gray-800 mb-2"
          >
            ← KPI一覧に戻る
          </button>
          <h1 className="text-2xl font-bold text-gray-800">KPI詳細</h1>
          <p className="text-gray-600 mt-1">
            {new Date(kpi.periodStart).toLocaleDateString('ja-JP')} ～{' '}
            {new Date(kpi.periodEnd).toLocaleDateString('ja-JP')}
            {kpi.phase && ` (${kpi.phase})`}
          </p>
        </div>
      </div>

      {/* スナップショット保存フォーム */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">今日のスナップショット保存</h2>
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">日付</label>
            <input
              type="date"
              value={snapshotDate}
              onChange={(e) => setSnapshotDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSaveSnapshot}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              保存
            </button>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">フェーズ</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">目標値</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">実績値</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {snapshotPhaseData.map((phase, index) => (
                <tr key={phase.phaseName}>
                  <td className="px-3 py-2">{phase.phaseName}</td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      value={phase.targetValue ?? ''}
                      onChange={(e) => {
                        const newData = [...snapshotPhaseData];
                        newData[index] = {
                          ...phase,
                          targetValue: e.target.value ? Number(e.target.value) : undefined,
                        };
                        setSnapshotPhaseData(newData);
                      }}
                      className="w-20 px-2 py-1 border border-gray-300 rounded"
                      placeholder="0"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      value={phase.actualValue ?? ''}
                      onChange={(e) => {
                        const newData = [...snapshotPhaseData];
                        newData[index] = {
                          ...phase,
                          actualValue: e.target.value ? Number(e.target.value) : undefined,
                        };
                        setSnapshotPhaseData(newData);
                      }}
                      className="w-20 px-2 py-1 border border-gray-300 rounded"
                      placeholder="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* タイムラインKPI */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">タイムラインKPI</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left border-b border-gray-300 bg-gray-50">期日</th>
                {keyPhases.map((phase) => (
                  <th key={phase} className="px-3 py-2 text-center border-b border-gray-300 bg-gray-50">
                    {phase}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* 目標値行（KPIのphaseDataから） */}
              {kpi.phaseData && kpi.phaseData.length > 0 && (
                <tr>
                  <td className="px-3 py-2 border-b border-gray-200 font-medium">目標値</td>
                  {keyPhases.map((phaseName) => {
                    const phase = kpi.phaseData?.find((p) => p.phaseName === phaseName);
                    return (
                      <td key={phaseName} className="px-3 py-2 text-center border-b border-gray-200">
                        {phase?.targetValue ?? '-'}
                      </td>
                    );
                  })}
                </tr>
              )}
              
              {/* スナップショット行 */}
              {snapshots.map((snapshot) => (
                <tr key={snapshot.id}>
                  <td className="px-3 py-2 border-b border-gray-200">
                    {new Date(snapshot.snapshotDate).toLocaleDateString('ja-JP', {
                      month: 'numeric',
                      day: 'numeric',
                    })}
                  </td>
                  {keyPhases.map((phaseName) => {
                    const phase = snapshot.phaseData?.find((p) => p.phaseName === phaseName);
                    const targetPhase = kpi.phaseData?.find((p) => p.phaseName === phaseName);
                    const status = getStatusSymbol(targetPhase?.targetValue, phase?.actualValue);
                    const color = getStatusColor(targetPhase?.targetValue, phase?.actualValue);
                    
                    return (
                      <td key={phaseName} className="px-3 py-2 text-center border-b border-gray-200">
                        <div className="flex flex-col items-center">
                          <span className={phase?.actualValue !== undefined ? color : 'text-gray-500'}>
                            {phase?.actualValue ?? '-'}
                          </span>
                          {status !== '-' && (
                            <span className={`text-xs ${color}`}>{status}</span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
              
              {/* 現在の実績値行（最新スナップショットまたはKPIのphaseData） */}
              {snapshots.length === 0 && kpi.phaseData && kpi.phaseData.length > 0 && (
                <tr>
                  <td className="px-3 py-2 border-b border-gray-200 font-medium">実績値</td>
                  {keyPhases.map((phaseName) => {
                    const phase = kpi.phaseData?.find((p) => p.phaseName === phaseName);
                    const targetPhase = kpi.phaseData?.find((p) => p.phaseName === phaseName);
                    const status = getStatusSymbol(targetPhase?.targetValue, phase?.actualValue);
                    const color = getStatusColor(targetPhase?.targetValue, phase?.actualValue);
                    
                    return (
                      <td key={phaseName} className="px-3 py-2 text-center border-b border-gray-200">
                        <div className="flex flex-col items-center">
                          <span className={phase?.actualValue !== undefined ? color : 'text-gray-500'}>
                            {phase?.actualValue ?? '-'}
                          </span>
                          {status !== '-' && (
                            <span className={`text-xs ${color}`}>{status}</span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

