import { useEffect, useState } from 'react';
import { companyAnalysisApi } from '../lib/api';
import type { CompanyAnalysis } from '@recruit-architect/openapi';

export function CompanyAnalysisPage() {
  const [companyAnalysis, setCompanyAnalysis] = useState<CompanyAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const fetchData = async () => {
    try {
      const data = await companyAnalysisApi.getAll() as CompanyAnalysis[];
      // 1ユーザー1企業前提なので、最初の1つだけを使用
      if (data.length > 0) {
        setCompanyAnalysis(data[0]);
      } else {
        // 企業分析が存在しない場合は自動的に作成
        const newItem = await companyAnalysisApi.create({
          companyName: '企業名を入力してください',
        }) as CompanyAnalysis;
        setCompanyAnalysis(newItem);
        setActiveTab('edit');
      }
    } catch (error) {
      console.error('Failed to fetch company analyses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (updatedData: Partial<CompanyAnalysis>) => {
    if (!companyAnalysis) return;
    try {
      console.log('Updating company analysis:', companyAnalysis.id, updatedData);
      const updated = await companyAnalysisApi.update(companyAnalysis.id, updatedData) as CompanyAnalysis;
      setCompanyAnalysis(updated);
      setActiveTab('dashboard');
    } catch (error) {
      console.error('Failed to save company analysis:', error);
      alert('保存に失敗しました。コンソールを確認してください。');
    }
  };

  if (loading) {
    return <div className="p-6">読み込み中...</div>;
  }

  if (!companyAnalysis) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">企業・競合分析</h1>
        <div className="text-center py-12 text-gray-500">
          企業分析を読み込み中...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">企業・競合分析</h1>
        {activeTab !== 'edit' && (
          <button
            onClick={() => setActiveTab('edit')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            編集
          </button>
        )}
      </div>

      <div className="mb-4 border-b border-gray-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 border-b-2 ${
              activeTab === 'dashboard'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500'
            }`}
          >
            ダッシュボード
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 border-b-2 ${
              activeTab === 'edit'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500'
            }`}
          >
            編集
          </button>
        </div>
      </div>

      {activeTab === 'dashboard' ? (
        <DashboardView item={companyAnalysis} />
      ) : (
        <EditView
          item={companyAnalysis}
          onSave={handleSave}
          onCancel={() => setActiveTab('dashboard')}
        />
      )}
    </div>
  );
}

function DashboardView({ item }: { item: CompanyAnalysis }) {
  return (
    <div className="space-y-6">
      {/* 基本情報 */}
      <Section title="基本情報">
        <div className="grid grid-cols-2 gap-4">
          <InfoField label="企業名" value={item.companyName} />
          <InfoField label="代表者" value={item.representative} />
          <InfoField
            label="設立日"
            value={item.foundedDate ? new Date(item.foundedDate).toLocaleDateString('ja-JP') : '-'}
          />
          <InfoField label="従業員数" value={item.employees} />
          <InfoField label="所在地" value={item.address} />
        </div>
      </Section>

      {/* A: 主な競合 */}
      {item.competitors && item.competitors.length > 0 && (
        <Section title="A: 主な競合">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left">NO.</th>
                <th className="border p-2 text-left">企業名</th>
                <th className="border p-2 text-left">売上</th>
                <th className="border p-2 text-left">得意な市場セグメント</th>
                <th className="border p-2 text-left">競争優位のポイント</th>
              </tr>
            </thead>
            <tbody>
              {item.competitors.map((comp) => (
                <tr key={comp.id}>
                  <td className="border p-2">{comp.no}</td>
                  <td className="border p-2">{comp.companyName}</td>
                  <td className="border p-2">{comp.sales || '-'}</td>
                  <td className="border p-2">{comp.targetMarketSegment || '-'}</td>
                  <td className="border p-2">{comp.competitiveAdvantagePoint || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}

      {/* B: 自社の立ち位置 */}
      {item.companyPosition && (
        <Section title="B: 自社の立ち位置">
          <p className="whitespace-pre-wrap">{item.companyPosition.description}</p>
        </Section>
      )}

      {/* C: 各社の競争戦略 */}
      {item.competitorStrategies && item.competitorStrategies.length > 0 && (
        <Section title="C: 各社の競争戦略">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div></div>
            <div className="text-center font-semibold">価値優位 (低)</div>
            <div className="text-center font-semibold">価値優位 (高)</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="font-semibold text-center">價格優位 (高)</div>
            <div className="border-2 border-gray-300 h-32 p-2">
              {item.competitorStrategies
                .filter((s) => s.pricePosition === 'high' && s.valuePosition === 'low')
                .map((s) => (
                  <div key={s.id} className="text-sm">{s.companyName}</div>
                ))}
            </div>
            <div className="border-2 border-gray-300 h-32 p-2">
              {item.competitorStrategies
                .filter((s) => s.pricePosition === 'high' && s.valuePosition === 'high')
                .map((s) => (
                  <div key={s.id} className="text-sm">{s.companyName}</div>
                ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="font-semibold text-center">價格優位 (低)</div>
            <div className="border-2 border-gray-300 h-32 p-2">
              {item.competitorStrategies
                .filter((s) => s.pricePosition === 'low' && s.valuePosition === 'low')
                .map((s) => (
                  <div key={s.id} className="text-sm">{s.companyName}</div>
                ))}
            </div>
            <div className="border-2 border-gray-300 h-32 p-2">
              {item.competitorStrategies
                .filter((s) => s.pricePosition === 'low' && s.valuePosition === 'high')
                .map((s) => (
                  <div key={s.id} className="text-sm">{s.companyName}</div>
                ))}
            </div>
          </div>
        </Section>
      )}

      {/* D: 業界内のプレイヤーの特徴 */}
      {item.industryPlayerCharacteristics && item.industryPlayerCharacteristics.length > 0 && (
        <Section title="D: 業界内のプレイヤーの特徴">
          <ul className="list-disc list-inside space-y-2">
            {item.industryPlayerCharacteristics.map((char) => (
              <li key={char.id}>{char.characteristic}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* 外部環境・内部環境 */}
      {item.externalInternalAnalysis && (
        <Section title="外部環境・内部環境">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">強み</h4>
              <ul className="list-disc list-inside space-y-1">
                {item.externalInternalAnalysis.strengths?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">弱み</h4>
              <ul className="list-disc list-inside space-y-1">
                {item.externalInternalAnalysis.weaknesses?.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">機会</h4>
              <ul className="list-disc list-inside space-y-1">
                {item.externalInternalAnalysis.opportunities?.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">脅威</h4>
              <ul className="list-disc list-inside space-y-1">
                {item.externalInternalAnalysis.threats?.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          {item.externalInternalAnalysis.targetPosition && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">目指したい立ち位置</h4>
              <p className="whitespace-pre-wrap">{item.externalInternalAnalysis.targetPosition}</p>
            </div>
          )}
        </Section>
      )}

      {/* 市場調査 */}
      {item.marketResearch && (
        <Section title="市場調査">
          {item.marketResearch.marketMacro && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2">市場 (マクロ)</h4>
              <p className="whitespace-pre-wrap">{item.marketResearch.marketMacro}</p>
            </div>
          )}
          {item.marketResearch.marketSegment && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2">市場セグメント・顧客群</h4>
              <p className="whitespace-pre-wrap">{item.marketResearch.marketSegment}</p>
            </div>
          )}
          {item.marketResearch.customerCharacteristics && (
            <div>
              <h4 className="font-semibold mb-2">顧客特性</h4>
              <p className="whitespace-pre-wrap">{item.marketResearch.customerCharacteristics}</p>
            </div>
          )}
        </Section>
      )}

      {/* 競争優位性 */}
      {item.competitiveAdvantage && (
        <Section title="競争優位性">
          <div className="grid grid-cols-2 gap-4">
            {item.competitiveAdvantage.strategy && (
              <div>
                <h4 className="font-semibold mb-2">戦略</h4>
                <p className="whitespace-pre-wrap">{item.competitiveAdvantage.strategy}</p>
              </div>
            )}
            {item.competitiveAdvantage.organization && (
              <div>
                <h4 className="font-semibold mb-2">組織</h4>
                <p className="whitespace-pre-wrap">{item.competitiveAdvantage.organization}</p>
              </div>
            )}
            {item.competitiveAdvantage.system && (
              <div>
                <h4 className="font-semibold mb-2">仕組</h4>
                <p className="whitespace-pre-wrap">{item.competitiveAdvantage.system}</p>
              </div>
            )}
            {item.competitiveAdvantage.technology && (
              <div>
                <h4 className="font-semibold mb-2">技術</h4>
                <p className="whitespace-pre-wrap">{item.competitiveAdvantage.technology}</p>
              </div>
            )}
            {item.competitiveAdvantage.talent && (
              <div>
                <h4 className="font-semibold mb-2">人材</h4>
                <p className="whitespace-pre-wrap">{item.competitiveAdvantage.talent}</p>
              </div>
            )}
            {item.competitiveAdvantage.values && (
              <div>
                <h4 className="font-semibold mb-2">価値観</h4>
                <p className="whitespace-pre-wrap">{item.competitiveAdvantage.values}</p>
              </div>
            )}
          </div>
          {item.competitiveAdvantage.competitiveAdvantageSource && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">競争優位の源泉</h4>
              <p className="whitespace-pre-wrap">
                {item.competitiveAdvantage.competitiveAdvantageSource}
              </p>
            </div>
          )}
        </Section>
      )}

      {/* 将来の市場見通し */}
      {item.futureMarketOutlook && (
        <Section title="将来の市場見通し">
          {item.futureMarketOutlook.marketChanges && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2">市場の変化</h4>
              <p className="whitespace-pre-wrap">{item.futureMarketOutlook.marketChanges}</p>
            </div>
          )}
          {item.futureMarketOutlook.customerChanges && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2">顧客の変化</h4>
              <p className="whitespace-pre-wrap">{item.futureMarketOutlook.customerChanges}</p>
            </div>
          )}
          {item.futureMarketOutlook.competitiveChanges && (
            <div>
              <h4 className="font-semibold mb-2">競争環境の変化</h4>
              <p className="whitespace-pre-wrap">{item.futureMarketOutlook.competitiveChanges}</p>
            </div>
          )}
        </Section>
      )}

      {/* 競合プレイヤーの変遷 */}
      {item.competitorEvolutions && item.competitorEvolutions.length > 0 && (
        <Section title="競合プレイヤーの変遷">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">古参</h4>
              <ul className="space-y-2">
                {item.competitorEvolutions
                  .filter((e) => e.category === 'established')
                  .map((e) => (
                    <li key={e.id} className="border p-2 rounded">
                      <div className="font-semibold">{e.companyName}</div>
                      {e.characteristics && (
                        <div className="text-sm text-gray-600">{e.characteristics}</div>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">新参</h4>
              <ul className="space-y-2">
                {item.competitorEvolutions
                  .filter((e) => e.category === 'newcomer')
                  .map((e) => (
                    <li key={e.id} className="border p-2 rounded">
                      <div className="font-semibold">{e.companyName}</div>
                      {e.characteristics && (
                        <div className="text-sm text-gray-600">{e.characteristics}</div>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </Section>
      )}

      {/* 市場の変遷 */}
      {item.marketEvolutions && item.marketEvolutions.length > 0 && (
        <Section title="市場の変遷">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left">時期</th>
                <th className="border p-2 text-left">市場動向</th>
                <th className="border p-2 text-left">特徴・ニーズ</th>
              </tr>
            </thead>
            <tbody>
              {item.marketEvolutions.map((ev) => (
                <tr key={ev.id}>
                  <td className="border p-2">{ev.period || '-'}</td>
                  <td className="border p-2">{ev.marketTrend || '-'}</td>
                  <td className="border p-2">{ev.featuresAndNeeds || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}

      {/* ターゲット市場セグメント */}
      {item.targetMarketSegments && item.targetMarketSegments.length > 0 && (
        <Section title="ターゲット市場セグメント">
          <ul className="space-y-2">
            {item.targetMarketSegments.map((seg) => (
              <li key={seg.id} className="border p-3 rounded">
                <div className="font-semibold">{seg.segment}</div>
                {seg.description && (
                  <div className="text-sm text-gray-600 mt-1">{seg.description}</div>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 設立メンバー */}
      {item.foundingMembers && item.foundingMembers.length > 0 && (
        <Section title="設立メンバー">
          <ul className="space-y-2">
            {item.foundingMembers.map((member) => (
              <li key={member.id} className="border p-3 rounded">
                <div className="font-semibold">{member.name}</div>
                {member.position && <div className="text-sm text-gray-600">{member.position}</div>}
                {member.role && <div className="text-sm text-gray-600">{member.role}</div>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 主力製品 */}
      {item.mainProducts && item.mainProducts.length > 0 && (
        <Section title="主力製品">
          <ul className="space-y-2">
            {item.mainProducts.map((product) => (
              <li key={product.id} className="border p-3 rounded">
                <div className="font-semibold">{product.productName}</div>
                {product.launchDate && (
                  <div className="text-sm text-gray-600">
                    {new Date(product.launchDate).toLocaleDateString('ja-JP')}
                  </div>
                )}
                {product.description && (
                  <div className="text-sm text-gray-600 mt-1">{product.description}</div>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 企業の沿革 */}
      {item.companyHistories && item.companyHistories.length > 0 && (
        <Section title="企業の沿革">
          <div className="space-y-3">
            {item.companyHistories
              .sort((a, b) => a.year.localeCompare(b.year))
              .map((history) => (
                <div key={history.id} className="border-l-4 border-blue-500 pl-4">
                  <div className="font-semibold">{history.year}</div>
                  <div className="font-semibold mt-1">{history.event}</div>
                  {history.description && (
                    <div className="text-sm text-gray-600 mt-1">{history.description}</div>
                  )}
                </div>
              ))}
          </div>
        </Section>
      )}

      {/* 組織構成 */}
      {item.organizationStructure && (
        <Section title="組織構成">
          {item.organizationStructure.structure && (
            <p className="whitespace-pre-wrap">{item.organizationStructure.structure}</p>
          )}
          {item.organizationStructure.description && (
            <p className="whitespace-pre-wrap mt-2">{item.organizationStructure.description}</p>
          )}
        </Section>
      )}

      {/* 人事・評価制度 */}
      {item.hrEvaluationSystem && (
        <Section title="人事・評価制度">
          {item.hrEvaluationSystem.system && (
            <p className="whitespace-pre-wrap">{item.hrEvaluationSystem.system}</p>
          )}
          {item.hrEvaluationSystem.description && (
            <p className="whitespace-pre-wrap mt-2">{item.hrEvaluationSystem.description}</p>
          )}
        </Section>
      )}

      {/* 企業風土 */}
      {item.corporateCulture && (
        <Section title="企業風土">
          {item.corporateCulture.culture && (
            <p className="whitespace-pre-wrap">{item.corporateCulture.culture}</p>
          )}
          {item.corporateCulture.description && (
            <p className="whitespace-pre-wrap mt-2">{item.corporateCulture.description}</p>
          )}
        </Section>
      )}

      {/* その他エピソード */}
      {item.otherEpisodes && (
        <Section title="その他エピソード">
          <p className="whitespace-pre-wrap">{item.otherEpisodes}</p>
        </Section>
      )}

      {/* 備考 */}
      {item.notes && (
        <Section title="備考">
          <p className="whitespace-pre-wrap">{item.notes}</p>
        </Section>
      )}
    </div>
  );
}

// IDを生成するヘルパー関数（既存のIDがあれば使用、なければ新規生成）
function getOrGenerateId(existingId?: string | null): string {
  return existingId && existingId !== '' ? existingId : crypto.randomUUID();
}

function EditView({
  item,
  onSave,
  onCancel,
}: {
  item: CompanyAnalysis;
  onSave: (data: Partial<CompanyAnalysis>) => Promise<void>;
  onCancel: () => void;
}) {
  // 不要なフィールドを除外して初期化
  const { id, createdAt, updatedAt, comments, ...initialData } = item;
  const [formData, setFormData] = useState<Partial<CompanyAnalysis>>(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // id, createdAt, updatedAt, comments などの不要なフィールドを除外
    const dataToSave = { ...formData };
    delete (dataToSave as { id?: string }).id;
    delete (dataToSave as { createdAt?: string }).createdAt;
    delete (dataToSave as { updatedAt?: string }).updatedAt;
    delete (dataToSave as { comments?: unknown }).comments;
    console.log('Saving data:', dataToSave);
    await onSave(dataToSave);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 基本情報 */}
      <Section title="基本情報">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              企業名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.companyName || ''}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">代表者</label>
            <input
              type="text"
              value={formData.representative || ''}
              onChange={(e) => setFormData({ ...formData, representative: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">設立日</label>
            <input
              type="date"
              value={formData.foundedDate || ''}
              onChange={(e) => setFormData({ ...formData, foundedDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">従業員数</label>
            <input
              type="text"
              value={formData.employees || ''}
              onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">所在地</label>
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </Section>

      {/* A: 主な競合 */}
      <Section title="A: 主な競合">
        <CompetitorEditor
          competitors={formData.competitors || []}
          onChange={(competitors) => setFormData({ ...formData, competitors })}
        />
      </Section>

      {/* B: 自社の立ち位置 */}
      <Section title="B: 自社の立ち位置">
        <textarea
          value={formData.companyPosition?.description || ''}
          onChange={(e) => {
            setFormData({
              ...formData,
              companyPosition: { id: getOrGenerateId(formData.companyPosition?.id), description: e.target.value },
            });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          rows={4}
          placeholder="自社の立ち位置を入力してください"
        />
      </Section>

      {/* C: 各社の競争戦略 */}
      <Section title="C: 各社の競争戦略">
        <CompetitorStrategyEditor
          strategies={formData.competitorStrategies || []}
          onChange={(strategies) => setFormData({ ...formData, competitorStrategies: strategies })}
        />
      </Section>

      {/* D: 業界内のプレイヤーの特徴 */}
      <Section title="D: 業界内のプレイヤーの特徴">
        <ArrayEditor
          items={formData.industryPlayerCharacteristics || []}
          onChange={(items) => setFormData({ ...formData, industryPlayerCharacteristics: items as Array<{ id: string; characteristic: string }> })}
          labelKey="characteristic"
          placeholder="特徴を入力"
        />
      </Section>

      {/* 外部環境・内部環境 */}
      <Section title="外部環境・内部環境">
        <SWOTEditor
          analysis={formData.externalInternalAnalysis}
          onChange={(analysis) => setFormData({ ...formData, externalInternalAnalysis: analysis })}
        />
      </Section>

      {/* 市場調査 */}
      <Section title="市場調査">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">市場 (マクロ)</label>
            <textarea
              value={formData.marketResearch?.marketMacro || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  marketResearch: {
                    id: getOrGenerateId(formData.marketResearch?.id),
                    marketMacro: e.target.value,
                    marketSegment: formData.marketResearch?.marketSegment,
                    customerCharacteristics: formData.marketResearch?.customerCharacteristics,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              市場セグメント・顧客群
            </label>
            <textarea
              value={formData.marketResearch?.marketSegment || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  marketResearch: {
                    id: getOrGenerateId(formData.marketResearch?.id),
                    marketMacro: formData.marketResearch?.marketMacro,
                    marketSegment: e.target.value,
                    customerCharacteristics: formData.marketResearch?.customerCharacteristics,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">顧客特性</label>
            <textarea
              value={formData.marketResearch?.customerCharacteristics || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  marketResearch: {
                    id: getOrGenerateId(formData.marketResearch?.id),
                    marketMacro: formData.marketResearch?.marketMacro,
                    marketSegment: formData.marketResearch?.marketSegment,
                    customerCharacteristics: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={4}
            />
          </div>
        </div>
      </Section>

      {/* 競争優位性 */}
      <Section title="競争優位性">
        <CompetitiveAdvantageEditor
          advantage={formData.competitiveAdvantage}
          onChange={(advantage) => setFormData({ ...formData, competitiveAdvantage: advantage })}
        />
      </Section>

      {/* 将来の市場見通し */}
      <Section title="将来の市場見通し">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">市場の変化</label>
            <textarea
              value={formData.futureMarketOutlook?.marketChanges || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  futureMarketOutlook: {
                    id: getOrGenerateId(formData.futureMarketOutlook?.id),
                    marketChanges: e.target.value,
                    customerChanges: formData.futureMarketOutlook?.customerChanges,
                    competitiveChanges: formData.futureMarketOutlook?.competitiveChanges,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">顧客の変化</label>
            <textarea
              value={formData.futureMarketOutlook?.customerChanges || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  futureMarketOutlook: {
                    id: getOrGenerateId(formData.futureMarketOutlook?.id),
                    marketChanges: formData.futureMarketOutlook?.marketChanges,
                    customerChanges: e.target.value,
                    competitiveChanges: formData.futureMarketOutlook?.competitiveChanges,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">競争環境の変化</label>
            <textarea
              value={formData.futureMarketOutlook?.competitiveChanges || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  futureMarketOutlook: {
                    id: getOrGenerateId(formData.futureMarketOutlook?.id),
                    marketChanges: formData.futureMarketOutlook?.marketChanges,
                    customerChanges: formData.futureMarketOutlook?.customerChanges,
                    competitiveChanges: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={4}
            />
          </div>
        </div>
      </Section>

      {/* その他エピソード */}
      <Section title="その他エピソード">
        <textarea
          value={formData.otherEpisodes || ''}
          onChange={(e) => setFormData({ ...formData, otherEpisodes: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          rows={4}
        />
      </Section>

      {/* 備考 */}
      <Section title="備考">
        <textarea
          value={formData.notes || ''}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          rows={4}
        />
      </Section>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          保存
        </button>
      </div>
    </form>
  );
}

// ヘルパーコンポーネント
function CompetitorEditor({
  competitors,
  onChange,
}: {
  competitors: CompanyAnalysis['competitors'];
  onChange: (competitors: CompanyAnalysis['competitors']) => void;
}) {
  const addCompetitor = () => {
    const newNo = competitors ? Math.max(...competitors.map((c) => c.no), 0) + 1 : 1;
    onChange([
      ...(competitors || []),
      { id: crypto.randomUUID(), no: newNo, companyName: '' },
    ]);
  };

  const updateCompetitor = (id: string, updates: Partial<NonNullable<CompanyAnalysis['competitors']>[0]>) => {
    onChange(
      competitors?.map((c) => (c.id === id ? { ...c, ...updates } : c)) || []
    );
  };

  const removeCompetitor = (id: string) => {
    onChange(competitors?.filter((c) => c.id !== id) || []);
  };

  return (
    <div className="space-y-3">
      {competitors?.map((comp) => (
        <div key={comp.id} className="border p-3 rounded-lg">
          <div className="grid grid-cols-5 gap-2">
            <input
              type="number"
              value={comp.no}
              onChange={(e) => updateCompetitor(comp.id, { no: parseInt(e.target.value) })}
              className="px-2 py-1 border rounded"
              placeholder="NO."
            />
            <input
              type="text"
              value={comp.companyName}
              onChange={(e) => updateCompetitor(comp.id, { companyName: e.target.value })}
              className="px-2 py-1 border rounded"
              placeholder="企業名"
            />
            <input
              type="text"
              value={comp.sales || ''}
              onChange={(e) => updateCompetitor(comp.id, { sales: e.target.value })}
              className="px-2 py-1 border rounded"
              placeholder="売上"
            />
            <input
              type="text"
              value={comp.targetMarketSegment || ''}
              onChange={(e) => updateCompetitor(comp.id, { targetMarketSegment: e.target.value })}
              className="px-2 py-1 border rounded"
              placeholder="得意な市場セグメント"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={comp.competitiveAdvantagePoint || ''}
                onChange={(e) => updateCompetitor(comp.id, { competitiveAdvantagePoint: e.target.value })}
                className="flex-1 px-2 py-1 border rounded"
                placeholder="競争優位のポイント"
              />
              <button
                type="button"
                onClick={() => removeCompetitor(comp.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                削除
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addCompetitor}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        + 競合を追加
      </button>
    </div>
  );
}

function CompetitorStrategyEditor({
  strategies,
  onChange,
}: {
  strategies: CompanyAnalysis['competitorStrategies'];
  onChange: (strategies: CompanyAnalysis['competitorStrategies']) => void;
}) {
  const addStrategy = () => {
    onChange([
      ...(strategies || []),
      { id: crypto.randomUUID(), companyName: '', pricePosition: 'medium', valuePosition: 'medium' },
    ]);
  };

  const updateStrategy = (
    id: string,
    updates: Partial<NonNullable<CompanyAnalysis['competitorStrategies']>[0]>
  ) => {
    onChange(strategies?.map((s) => (s.id === id ? { ...s, ...updates } : s)) || []);
  };

  const removeStrategy = (id: string) => {
    onChange(strategies?.filter((s) => s.id !== id) || []);
  };

  return (
    <div className="space-y-3">
      {strategies?.map((strategy) => (
        <div key={strategy.id} className="border p-3 rounded-lg">
          <div className="grid grid-cols-4 gap-2">
            <input
              type="text"
              value={strategy.companyName}
              onChange={(e) => updateStrategy(strategy.id, { companyName: e.target.value })}
              className="px-2 py-1 border rounded"
              placeholder="企業名"
            />
            <select
              value={strategy.pricePosition}
              onChange={(e) =>
                updateStrategy(strategy.id, { pricePosition: e.target.value as 'low' | 'medium' | 'high' })
              }
              className="px-2 py-1 border rounded"
            >
              <option value="low">價格優位 (低)</option>
              <option value="medium">價格優位 (中)</option>
              <option value="high">價格優位 (高)</option>
            </select>
            <select
              value={strategy.valuePosition}
              onChange={(e) =>
                updateStrategy(strategy.id, { valuePosition: e.target.value as 'low' | 'medium' | 'high' })
              }
              className="px-2 py-1 border rounded"
            >
              <option value="low">価値優位 (低)</option>
              <option value="medium">価値優位 (中)</option>
              <option value="high">価値優位 (高)</option>
            </select>
            <button
              type="button"
              onClick={() => removeStrategy(strategy.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              削除
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addStrategy}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        + 戦略を追加
      </button>
    </div>
  );
}

function ArrayEditor({
  items,
  onChange,
  labelKey,
  placeholder,
}: {
  items: Array<{ id: string; [key: string]: unknown }>;
  onChange: (items: Array<{ id: string; [key: string]: unknown }>) => void;
  labelKey: string;
  placeholder: string;
}) {
  const addItem = () => {
    onChange([...items, { id: crypto.randomUUID(), [labelKey]: '' }]);
  };

  const updateItem = (id: string, value: string) => {
    onChange(items.map((item) => (item.id === id ? { ...item, [labelKey]: value } : item)));
  };

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex gap-2">
          <input
            type="text"
            value={(item[labelKey] as string) || ''}
            onChange={(e) => updateItem(item.id, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="px-3 py-2 bg-red-500 text-white rounded-lg"
          >
            削除
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        + 追加
      </button>
    </div>
  );
}

function SWOTEditor({
  analysis,
  onChange,
}: {
  analysis: CompanyAnalysis['externalInternalAnalysis'];
  onChange: (analysis: CompanyAnalysis['externalInternalAnalysis']) => void;
}) {
  const updateArray = (key: 'strengths' | 'weaknesses' | 'opportunities' | 'threats', items: string[]) => {
    onChange({
      id: getOrGenerateId(analysis?.id),
      strengths: analysis?.strengths || [],
      weaknesses: analysis?.weaknesses || [],
      opportunities: analysis?.opportunities || [],
      threats: analysis?.threats || [],
      targetPosition: analysis?.targetPosition,
      [key]: items,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">強み</label>
          <ArrayEditor
            items={(analysis?.strengths || []).map((s, i) => ({ id: String(i), text: s }))}
            onChange={(items) => updateArray('strengths', items.map((item) => (item.text || item['text']) as string))}
            labelKey="text"
            placeholder="強みを入力"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">弱み</label>
          <ArrayEditor
            items={(analysis?.weaknesses || []).map((w, i) => ({ id: String(i), text: w }))}
            onChange={(items) => updateArray('weaknesses', items.map((item) => (item.text || item['text']) as string))}
            labelKey="text"
            placeholder="弱みを入力"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">機会</label>
          <ArrayEditor
            items={(analysis?.opportunities || []).map((o, i) => ({ id: String(i), text: o }))}
            onChange={(items) => updateArray('opportunities', items.map((item) => (item.text || item['text']) as string))}
            labelKey="text"
            placeholder="機会を入力"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">脅威</label>
          <ArrayEditor
            items={(analysis?.threats || []).map((t, i) => ({ id: String(i), text: t }))}
            onChange={(items) => updateArray('threats', items.map((item) => (item.text || item['text']) as string))}
            labelKey="text"
            placeholder="脅威を入力"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">目指したい立ち位置</label>
        <textarea
          value={analysis?.targetPosition || ''}
          onChange={(e) =>
            onChange({
              id: getOrGenerateId(analysis?.id),
              strengths: analysis?.strengths || [],
              weaknesses: analysis?.weaknesses || [],
              opportunities: analysis?.opportunities || [],
              threats: analysis?.threats || [],
              targetPosition: e.target.value,
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          rows={3}
        />
      </div>
    </div>
  );
}

function CompetitiveAdvantageEditor({
  advantage,
  onChange,
}: {
  advantage: CompanyAnalysis['competitiveAdvantage'];
  onChange: (advantage: CompanyAnalysis['competitiveAdvantage']) => void;
}) {
  const updateField = (field: string, value: string) => {
    onChange({
      id: getOrGenerateId(advantage?.id),
      strategy: advantage?.strategy,
      organization: advantage?.organization,
      system: advantage?.system,
      technology: advantage?.technology,
      talent: advantage?.talent,
      values: advantage?.values,
      competitiveAdvantageSource: advantage?.competitiveAdvantageSource,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">戦略</label>
          <textarea
            value={advantage?.strategy || ''}
            onChange={(e) => updateField('strategy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">組織</label>
          <textarea
            value={advantage?.organization || ''}
            onChange={(e) => updateField('organization', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">仕組</label>
          <textarea
            value={advantage?.system || ''}
            onChange={(e) => updateField('system', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">技術</label>
          <textarea
            value={advantage?.technology || ''}
            onChange={(e) => updateField('technology', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">人材</label>
          <textarea
            value={advantage?.talent || ''}
            onChange={(e) => updateField('talent', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">価値観</label>
          <textarea
            value={advantage?.values || ''}
            onChange={(e) => updateField('values', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            rows={3}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">競争優位の源泉</label>
        <textarea
          value={advantage?.competitiveAdvantageSource || ''}
          onChange={(e) => updateField('competitiveAdvantageSource', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          rows={3}
        />
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      {children}
    </div>
  );
}

function InfoField({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div className="text-gray-800">{value || '-'}</div>
    </div>
  );
}
