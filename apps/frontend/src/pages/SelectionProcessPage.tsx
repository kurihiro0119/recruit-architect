import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FormField } from '../components/FormField';
import { selectionProcessApi, positionApi, organizationMemberApi } from '../lib/api';

interface SelectionProcess {
  id: string;
  stepNo: number;
  phaseName: string;
  detailedProcess?: string;
  owner?: string;
  ownerType?: 'position' | 'member' | 'text';
  ownerId?: string;
  ownerDisplayName?: string;
  requiredDays?: number;
  processType: 'current' | 'ideal';
  notes?: string;
}

interface Position {
  id: string;
  name: string;
}

interface OrganizationMember {
  id: string;
  name: string;
  positionId?: string;
}


const ownerTypeOptions = [
  { value: 'position', label: '役職' },
  { value: 'member', label: 'メンバー' },
  { value: 'text', label: '自由入力' },
];

const initialFormData = {
  stepNo: 1,
  phaseName: '',
  detailedProcess: '',
  ownerType: 'text' as 'position' | 'member' | 'text',
  ownerId: '',
  ownerDisplayName: '',
  requiredDays: 0,
  processType: 'current' as 'current' | 'ideal',
  notes: '',
};

export function SelectionProcessPage() {
  const [items, setItems] = useState<SelectionProcess[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SelectionProcess | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  const fetchData = async () => {
    try {
      const [processes, positionsData, membersData] = await Promise.all([
        selectionProcessApi.getAll() as Promise<SelectionProcess[]>,
        positionApi.getAll() as Promise<Position[]>,
        organizationMemberApi.getAll() as Promise<OrganizationMember[]>,
      ]);
      setItems(processes);
      setPositions(positionsData);
      setMembers(membersData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item: SelectionProcess) => {
    setEditingItem(item);
    setFormData({
      stepNo: item.stepNo,
      phaseName: item.phaseName,
      detailedProcess: item.detailedProcess || '',
      ownerType: item.ownerType || 'text',
      ownerId: item.ownerId || '',
      ownerDisplayName: item.ownerDisplayName || item.owner || '',
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

  const handleOwnerTypeChange = (ownerType: 'position' | 'member' | 'text') => {
    if (ownerType === 'position' || ownerType === 'member') {
      setFormData({ ...formData, ownerType, ownerId: '', ownerDisplayName: '' });
    } else {
      setFormData({ ...formData, ownerType, ownerId: '', ownerDisplayName: '' });
    }
  };

  const handleOwnerIdChange = (ownerId: string) => {
    let displayName = '';
    if (formData.ownerType === 'position') {
      const position = positions.find((p) => p.id === ownerId);
      displayName = position?.name || '';
    } else if (formData.ownerType === 'member') {
      const member = members.find((m) => m.id === ownerId);
      displayName = member?.name || '';
    }
    setFormData({ ...formData, ownerId, ownerDisplayName: displayName });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
      };
      if (editingItem) {
        await selectionProcessApi.update(editingItem.id, submitData);
      } else {
        await selectionProcessApi.create(submitData);
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Failed to save selection process:', error);
    }
  };

  const getOwnerDisplay = (item: SelectionProcess) => {
    return item.ownerDisplayName || item.owner || '-';
  };

  const columns = [
    { key: 'stepNo', label: 'ステップNo' },
    { key: 'phaseName', label: 'フェーズ' },
    { key: 'detailedProcess', label: '詳細プロセス' },
    {
      key: 'owner',
      label: '担い手',
      render: (item: SelectionProcess) => getOwnerDisplay(item),
    },
    { key: 'requiredDays', label: '所要日数（目安）' },
    { key: 'notes', label: '備考・補足' },
  ];

  const currentItems = items.filter((item) => item.processType === 'current').sort((a, b) => a.stepNo - b.stepNo);
  const idealItems = items.filter((item) => item.processType === 'ideal').sort((a, b) => a.stepNo - b.stepNo);

  const totalCurrentDays = currentItems.reduce((sum, item) => sum + (item.requiredDays || 0), 0);
  const totalIdealDays = idealItems.reduce((sum, item) => sum + (item.requiredDays || 0), 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">選考プロセス管理</h1>
      
      {/* 現状のプロセス */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">選考プロセス（現状）</h2>
          <button
            onClick={() => {
              setFormData({ ...initialFormData, processType: 'current' });
              setEditingItem(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>新規作成</span>
          </button>
        </div>
        <DataTable
          data={currentItems}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          title=""
          loading={loading}
        />
        {currentItems.length > 0 && (
          <div className="mt-4 text-right text-gray-600">
            <span className="font-semibold">合計日数: {totalCurrentDays}日</span>
          </div>
        )}
      </div>

      {/* 理想のプロセス */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">選考プロセス（理想）</h2>
          <button
            onClick={() => {
              setFormData({ ...initialFormData, processType: 'ideal' });
              setEditingItem(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <span>新規作成</span>
          </button>
        </div>
        <DataTable
          data={idealItems}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          title=""
          loading={loading}
        />
        {idealItems.length > 0 && (
          <div className="mt-4 text-right text-gray-600">
            <span className="font-semibold">合計日数: {totalIdealDays}日</span>
          </div>
        )}
      </div>

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
            label="担い手タイプ"
            name="ownerType"
            type="select"
            value={formData.ownerType}
            onChange={(v) => handleOwnerTypeChange(v as 'position' | 'member' | 'text')}
            options={ownerTypeOptions}
            required
          />
          {formData.ownerType === 'position' && (
            <FormField
              label="役職"
              name="ownerId"
              type="select"
              value={formData.ownerId}
              onChange={(v) => handleOwnerIdChange(String(v))}
              options={positions.map((p) => ({ value: p.id, label: p.name }))}
              required
            />
          )}
          {formData.ownerType === 'member' && (
            <FormField
              label="メンバー"
              name="ownerId"
              type="select"
              value={formData.ownerId}
              onChange={(v) => handleOwnerIdChange(String(v))}
              options={members.map((m) => ({ value: m.id, label: m.name }))}
              required
            />
          )}
          {formData.ownerType === 'text' && (
            <FormField
              label="担い手（自由入力）"
              name="ownerDisplayName"
              value={formData.ownerDisplayName}
              onChange={(v) => setFormData({ ...formData, ownerDisplayName: String(v) })}
              placeholder="例: 川崎さん、RPO&人事部"
            />
          )}
          <FormField
            label="所要日数（目安）"
            name="requiredDays"
            type="number"
            value={formData.requiredDays}
            onChange={(v) => setFormData({ ...formData, requiredDays: Number(v) })}
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
