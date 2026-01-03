import { useEffect, useState } from 'react';
import { BarChart3, Target, FileText, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { kpiApi, initiativeApi, jobPostingApi } from '../lib/api';

interface DashboardStats {
  kpiCount: number;
  initiativeCount: number;
  jobPostingCount: number;
  activeInitiatives: number;
}

interface Kpi {
  id: string;
  periodStart: string;
  periodEnd: string;
  phase?: string;
  phaseData?: Array<{
    phaseName: string;
    targetValue?: number;
    actualValue?: number;
  }>;
}

interface Initiative {
  id: string;
  milestone: string;
  mainOwner: string;
  status?: string;
  timing: string;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    kpiCount: 0,
    initiativeCount: 0,
    jobPostingCount: 0,
    activeInitiatives: 0,
  });
  const [recentKpis, setRecentKpis] = useState<Kpi[]>([]);
  const [recentInitiatives, setRecentInitiatives] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [kpis, initiatives, jobPostings] = await Promise.all([
          kpiApi.getAll() as Promise<Kpi[]>,
          initiativeApi.getAll() as Promise<Initiative[]>,
          jobPostingApi.getAll() as Promise<{ id: string }[]>,
        ]);

        setStats({
          kpiCount: kpis.length,
          initiativeCount: initiatives.length,
          jobPostingCount: jobPostings.length,
          activeInitiatives: initiatives.filter((i) => i.status === 'in_progress').length,
        });

        setRecentKpis(kpis.slice(0, 5));
        setRecentInitiatives(initiatives.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const statCards = [
    { label: 'KPI数', value: stats.kpiCount, icon: BarChart3, color: 'bg-blue-500' },
    { label: '施策数', value: stats.initiativeCount, icon: Target, color: 'bg-green-500' },
    { label: '求人数', value: stats.jobPostingCount, icon: FileText, color: 'bg-purple-500' },
    { label: '進行中施策', value: stats.activeInitiatives, icon: Users, color: 'bg-orange-500' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">読み込み中...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">ダッシュボード</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">KPIサマリ</h2>
          </div>
          <div className="p-6">
            {recentKpis.length === 0 ? (
              <p className="text-gray-500 text-center py-4">KPIデータがありません</p>
            ) : (
              <div className="space-y-4">
                {recentKpis.map((kpi) => {
                  const startDate = new Date(kpi.periodStart).toLocaleDateString('ja-JP');
                  const endDate = new Date(kpi.periodEnd).toLocaleDateString('ja-JP');
                  const period = `${startDate} ～ ${endDate}`;
                  
                  // 主要なフェーズのデータを取得（エントリー、書類通過、一次面接、最終面接、内定、承諾）
                  const keyPhases = ['エントリー', '書類通過', '一次面接', '最終面接', '内定', '承諾'];
                  
                  // phaseDataが配列かどうかを確認
                  const phaseDataArray = Array.isArray(kpi.phaseData) 
                    ? kpi.phaseData 
                    : (typeof kpi.phaseData === 'string' ? JSON.parse(kpi.phaseData) : []);
                  
                  const phaseData = phaseDataArray.filter((p: any) => keyPhases.includes(p.phaseName)) || [];
                  
                  // 最初のフェーズのデータを表示（または合計値）
                  const displayPhase = phaseData[0] || (phaseDataArray.length > 0 ? phaseDataArray[0] : null);
                  
                  if (!displayPhase) {
                    return (
                      <div key={kpi.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{period}</p>
                          <p className="text-sm text-gray-500">{kpi.phase || 'KPI'}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-800">-</p>
                        </div>
                      </div>
                    );
                  }
                  
                  const targetValue = displayPhase.targetValue || 0;
                  const actualValue = displayPhase.actualValue;
                  const diff = actualValue !== undefined ? actualValue - targetValue : 0;
                  const isPositive = diff >= 0;
                  
                  return (
                    <div key={kpi.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{period}</p>
                        <p className="text-sm text-gray-500">{displayPhase.phaseName}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800">
                          {actualValue ?? '-'} / {targetValue}
                        </p>
                        {actualValue !== undefined && (
                          <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            <span>{isPositive ? '+' : ''}{diff}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">進行中施策</h2>
          </div>
          <div className="p-6">
            {recentInitiatives.length === 0 ? (
              <p className="text-gray-500 text-center py-4">施策データがありません</p>
            ) : (
              <div className="space-y-4">
                {recentInitiatives.map((initiative) => (
                  <div key={initiative.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-800">{initiative.milestone}</p>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          initiative.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-700'
                            : initiative.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {initiative.status === 'in_progress'
                          ? '進行中'
                          : initiative.status === 'completed'
                          ? '完了'
                          : initiative.status === 'planned'
                          ? '計画中'
                          : '保留'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>担当: {initiative.mainOwner}</span>
                      <span>{initiative.timing}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
