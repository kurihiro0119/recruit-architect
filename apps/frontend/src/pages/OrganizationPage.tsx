import { useEffect, useState } from 'react';
import {
  organizationApi,
  departmentApi,
  teamApi,
  positionApi,
  organizationMemberApi,
} from '../lib/api';
import { Modal } from '../components/Modal';
import type {
  Organization,
  OrganizationMember,
  Department,
  Team,
  Position,
} from '@recruit-architect/openapi';

export function OrganizationPage() {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingMember, setEditingMember] = useState<OrganizationMember | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      // 組織を取得（1ユーザー1組織前提）
      const orgs = await organizationApi.getAll() as Organization[];
      if (orgs.length > 0) {
        const org = orgs[0];
        setOrganization(org);

        // 各エンティティを個別に取得
        const [depts, tms, pos, mems] = await Promise.all([
          departmentApi.getAll() as Promise<Department[]>,
          teamApi.getAll() as Promise<Team[]>,
          positionApi.getAll() as Promise<Position[]>,
          organizationMemberApi.getAll() as Promise<OrganizationMember[]>,
        ]);

        // 現在の組織に紐づくデータのみフィルタリング
        const orgDepts = depts.filter((d) => d.organizationId === org.id);
        const orgTeams = tms.filter((t) => orgDepts.some((d) => d.id === t.departmentId));
        const orgPositions = pos.filter((p) => p.organizationId === org.id);
        const orgMembers = mems.filter((m) => m.organizationId === org.id);

        setDepartments(orgDepts);
        setTeams(orgTeams);
        setPositions(orgPositions);
        setMembers(orgMembers);
      } else {
        // 組織が存在しない場合はエラー表示（将来的にSaaS対応で組織作成APIが必要）
        alert('組織が存在しません。管理者に連絡してください。');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      alert('データの取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddMember = () => {
    setEditingMember(null);
    setModalOpen(true);
  };

  const handleEditMember = (member: OrganizationMember) => {
    setEditingMember(member);
    setModalOpen(true);
  };

  const handleDeleteMember = async (memberId: string) => {
    if (!confirm('このメンバーを削除しますか？')) return;
    try {
      await organizationMemberApi.delete(memberId);
      await fetchData();
    } catch (error) {
      console.error('Failed to delete member:', error);
      alert('削除に失敗しました。');
    }
  };

  const handleSaveMember = async (memberData: Partial<OrganizationMember>) => {
    if (!organization) return;
    try {
      if (editingMember) {
        // 更新
        await organizationMemberApi.update(editingMember.id, {
          ...memberData,
          organizationId: organization.id,
        });
      } else {
        // 新規追加
        await organizationMemberApi.create({
          ...memberData,
          organizationId: organization.id,
        });
      }
      await fetchData();
      setModalOpen(false);
      setEditingMember(null);
    } catch (error) {
      console.error('Failed to save member:', error);
      alert('保存に失敗しました。');
    }
  };

  if (loading) {
    return <div className="p-6">読み込み中...</div>;
  }

  if (!organization) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">組織図管理</h1>
        <div className="text-center py-12 text-gray-500">組織情報が見つかりません</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">組織図管理</h1>
        {activeTab === 'dashboard' && (
          <button
            onClick={handleAddMember}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            メンバー追加
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
            一括編集
          </button>
          <button
            onClick={() => setActiveTab('master')}
            className={`px-4 py-2 border-b-2 ${
              activeTab === 'master'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500'
            }`}
          >
            マスター管理
          </button>
        </div>
      </div>

      {activeTab === 'dashboard' ? (
        <DashboardView
          departments={departments}
          teams={teams}
          positions={positions}
          members={members}
          onEdit={handleEditMember}
          onDelete={handleDeleteMember}
        />
      ) : activeTab === 'edit' ? (
        <EditView
          departments={departments}
          teams={teams}
          positions={positions}
          members={members}
          onRefresh={fetchData}
          onCancel={() => setActiveTab('dashboard')}
        />
      ) : (
        <MasterManagementView
          organization={organization}
          departments={departments}
          teams={teams}
          positions={positions}
          onRefresh={fetchData}
        />
      )}

      {/* メンバー編集モーダル */}
      <MemberEditModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingMember(null);
        }}
        member={editingMember}
        departments={departments}
        teams={teams}
        positions={positions}
        onSave={handleSaveMember}
      />
    </div>
  );
}

function DashboardView({
  departments,
  teams,
  positions,
  members,
  onEdit,
  onDelete,
}: {
  departments: Department[];
  teams: Team[];
  positions: Position[];
  members: OrganizationMember[];
  onEdit: (member: OrganizationMember) => void;
  onDelete: (memberId: string) => void;
}) {
  // 部署・チーム・役職の名前を取得するヘルパー
  const getDepartmentName = (id: string) => departments.find((d) => d.id === id)?.name || '-';
  const getTeamName = (id: string | null) => {
    if (!id) return '-';
    return teams.find((t) => t.id === id)?.name || '-';
  };
  const getPositionName = (id: string | null) => {
    if (!id) return '-';
    return positions.find((p) => p.id === id)?.name || '-';
  };

  // 部署とチームでグループ化
  const grouped = members.reduce((acc, member) => {
    const deptName = getDepartmentName(member.departmentId);
    const teamId = member.teamId ?? null;
    const teamName = getTeamName(teamId);
    const key = `${member.departmentId}::${teamId || 'no-team'}`;
    if (!acc[key]) {
      acc[key] = {
        departmentId: member.departmentId,
        departmentName: deptName,
        teamId,
        teamName,
        members: [],
      };
    }
    acc[key].members.push(member);
    return acc;
  }, {} as Record<string, { departmentId: string; departmentName: string; teamId: string | null; teamName: string; members: OrganizationMember[] }>);

  const groups = Object.values(grouped).sort((a, b) => {
    if (a.departmentName !== b.departmentName) {
      return a.departmentName.localeCompare(b.departmentName);
    }
    return a.teamName.localeCompare(b.teamName);
  });

  return (
    <div className="space-y-6">
      {/* 表形式の一覧 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">組織一覧</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  部署
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  チーム
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  氏名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  役職
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  雇用形態
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  備考
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    メンバーが登録されていません
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getDepartmentName(member.departmentId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getTeamName(member.teamId ?? null)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {member.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getPositionName(member.positionId ?? null)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.employmentType || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{member.notes || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onEdit(member)}
                          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          編集
                        </button>
                        <button
                          onClick={() => onDelete(member.id)}
                          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          削除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 部署・チーム別のグループ表示 */}
      {groups.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">部署・チーム別組織図</h2>
          </div>
          <div className="p-6 space-y-6">
            {groups.map((group, idx) => (
              <div key={idx} className="border-l-4 border-blue-500 pl-4">
                <div className="mb-3">
                  <span className="text-lg font-semibold text-gray-800">{group.departmentName}</span>
                  {group.teamId && group.teamName !== '-' && (
                    <span className="ml-2 text-sm text-gray-600">- {group.teamName}</span>
                  )}
                </div>
                <div className="space-y-2">
                  {group.members.map((member) => (
                    <div key={member.id} className="flex items-center gap-4 text-sm">
                      <span className="font-medium text-gray-900 w-32">{member.name}</span>
                      <span className="text-gray-600 w-48">
                        {getPositionName(member.positionId ?? null)}
                        {member.employmentType && ` / ${member.employmentType}`}
                      </span>
                      {member.notes && <span className="text-gray-500 text-xs">{member.notes}</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EditView({
  departments,
  teams,
  positions,
  members,
  onRefresh,
  onCancel,
}: {
  departments: Department[];
  teams: Team[];
  positions: Position[];
  members: OrganizationMember[];
  onRefresh: () => Promise<void>;
  onCancel: () => void;
}) {
  const [localMembers, setLocalMembers] = useState<OrganizationMember[]>(members);
  const [organizationId, setOrganizationId] = useState<string>('');

  useEffect(() => {
    setLocalMembers(members);
    // 最初のメンバーからorganizationIdを取得（なければ最初の部署から取得）
    if (members.length > 0 && members[0].organizationId) {
      setOrganizationId(members[0].organizationId);
    } else if (departments.length > 0 && departments[0].organizationId) {
      setOrganizationId(departments[0].organizationId);
    }
  }, [members, departments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 各メンバーを個別に保存
      for (const member of localMembers) {
        if (!member.name || member.name.trim() === '') {
          alert(`メンバー「${member.name || '未入力'}」の氏名を入力してください。`);
          return;
        }
        if (!member.departmentId) {
          alert(`メンバー「${member.name}」の部署を選択してください。`);
          return;
        }
        if (!organizationId) {
          alert('組織IDが取得できませんでした。');
          return;
        }

        if (member.createdAt) {
          // 既存メンバーの更新
          await organizationMemberApi.update(member.id, {
            organizationId: organizationId,
            departmentId: member.departmentId,
            teamId: member.teamId || null,
            positionId: member.positionId || null,
            name: member.name,
            employmentType: member.employmentType || null,
            notes: member.notes || null,
          });
        } else {
          // 新規メンバーの作成
          await organizationMemberApi.create({
            organizationId: organizationId,
            departmentId: member.departmentId,
            teamId: member.teamId || null,
            positionId: member.positionId || null,
            name: member.name,
            employmentType: member.employmentType || null,
            notes: member.notes || null,
          });
        }
      }
      await onRefresh();
      alert('保存が完了しました。');
    } catch (error) {
      console.error('Failed to save members:', error);
      alert('保存に失敗しました。');
    }
  };

  const addMember = () => {
    if (departments.length === 0) {
      alert('まず部署を追加してください');
      return;
    }
    if (!organizationId && departments.length > 0) {
      setOrganizationId(departments[0].organizationId);
    }
    const newMember: Partial<OrganizationMember> = {
      id: crypto.randomUUID(),
      organizationId: organizationId || departments[0].organizationId,
      departmentId: departments[0].id,
      teamId: null,
      positionId: null,
      name: '',
      employmentType: null,
      notes: null,
      // 新規作成時はcreatedAtを設定しない
    };
    setLocalMembers([...localMembers, newMember as OrganizationMember]);
  };

  const updateMember = (id: string, updates: Partial<OrganizationMember>) => {
    setLocalMembers(localMembers.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  const removeMember = async (id: string) => {
    const member = localMembers.find((m) => m.id === id);
    if (member && member.createdAt) {
      // 既存メンバーの削除
      if (!confirm('このメンバーを削除しますか？')) return;
      try {
        await organizationMemberApi.delete(id);
        await onRefresh();
      } catch (error) {
        console.error('Failed to delete member:', error);
        alert('削除に失敗しました。');
      }
    } else {
      // 新規追加したメンバーの削除（まだDBに保存されていない）
      setLocalMembers(localMembers.filter((m) => m.id !== id));
    }
  };

  const getTeamsByDepartment = (departmentId: string) => {
    return teams.filter((t) => t.departmentId === departmentId);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">メンバー一覧</h2>
          <button
            type="button"
            onClick={addMember}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + メンバー追加
          </button>
        </div>
        <div className="space-y-4">
          {localMembers.map((member) => {
            const availableTeams = getTeamsByDepartment(member.departmentId);
            return (
              <div key={member.id} className="border p-4 rounded-lg">
                <div className="grid grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      部署 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={member.departmentId}
                      onChange={(e) => {
                        updateMember(member.id, {
                          departmentId: e.target.value,
                          teamId: null, // 部署変更時はチームをリセット
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    >
                      <option value="">選択してください</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">チーム</label>
                    <select
                      value={member.teamId || ''}
                      onChange={(e) => updateMember(member.id, { teamId: e.target.value || null })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      disabled={!member.departmentId || availableTeams.length === 0}
                    >
                      <option value="">選択してください</option>
                      {availableTeams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      氏名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateMember(member.id, { name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">役職</label>
                    <select
                      value={member.positionId || ''}
                      onChange={(e) =>
                        updateMember(member.id, { positionId: e.target.value || null })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">選択してください</option>
                      {positions.map((pos) => (
                        <option key={pos.id} value={pos.id}>
                          {pos.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      削除
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">雇用形態</label>
                    <input
                      type="text"
                      value={member.employmentType || ''}
                      onChange={(e) =>
                        updateMember(member.id, { employmentType: e.target.value || null })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="例: 正社員"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">備考</label>
                    <input
                      type="text"
                      value={member.notes || ''}
                      onChange={(e) => updateMember(member.id, { notes: e.target.value || null })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

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

function MasterManagementView({
  organization,
  departments,
  teams,
  positions,
  onRefresh,
}: {
  organization: Organization;
  departments: Department[];
  teams: Team[];
  positions: Position[];
  onRefresh: () => Promise<void>;
}) {
  const [localDepartments, setLocalDepartments] = useState<Department[]>(departments);
  const [localTeams, setLocalTeams] = useState<Team[]>(teams);
  const [localPositions, setLocalPositions] = useState<Position[]>(positions);

  useEffect(() => {
    setLocalDepartments(departments);
    setLocalTeams(teams);
    setLocalPositions(positions);
  }, [departments, teams, positions]);

  // 部署管理
  const addDepartment = () => {
    const newDept: Partial<Department> = {
      id: crypto.randomUUID(),
      organizationId: organization.id,
      name: '',
      notes: null,
      // 新規作成時はcreatedAtを設定しない（DBから取得したデータのみcreatedAtを持つ）
    };
    setLocalDepartments([...localDepartments, newDept as Department]);
  };

  const updateDepartment = (id: string, updates: Partial<Department>) => {
    setLocalDepartments(
      localDepartments.map((d) => (d.id === id ? { ...d, ...updates } : d))
    );
  };

  const removeDepartment = async (id: string) => {
    if (!confirm('この部署を削除しますか？関連するチームとメンバーも削除されます。')) return;
    try {
      await departmentApi.delete(id);
      await onRefresh();
    } catch (error) {
      console.error('Failed to delete department:', error);
      alert('削除に失敗しました。');
    }
  };

  const saveDepartment = async (dept: Department) => {
    try {
      if (dept.name.trim() === '') {
        alert('部署名を入力してください');
        return;
      }
      // createdAtが存在する場合は既存データ、存在しない場合は新規作成
      if (dept.createdAt) {
        // 既存の更新
        await departmentApi.update(dept.id, {
          name: dept.name,
          notes: dept.notes,
        });
      } else {
        // 新規作成
        await departmentApi.create({
          organizationId: organization.id,
          name: dept.name,
          notes: dept.notes,
        });
      }
      await onRefresh();
    } catch (error) {
      console.error('Failed to save department:', error);
      alert('保存に失敗しました。');
    }
  };

  // チーム管理
  const addTeam = () => {
    if (localDepartments.length === 0) {
      alert('まず部署を追加してください');
      return;
    }
    const newTeam: Partial<Team> = {
      id: crypto.randomUUID(),
      departmentId: localDepartments[0].id,
      name: '',
      notes: null,
      // 新規作成時はcreatedAtを設定しない
    };
    setLocalTeams([...localTeams, newTeam as Team]);
  };

  const updateTeam = (id: string, updates: Partial<Team>) => {
    setLocalTeams(localTeams.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const removeTeam = async (id: string) => {
    if (!confirm('このチームを削除しますか？')) return;
    try {
      await teamApi.delete(id);
      await onRefresh();
    } catch (error) {
      console.error('Failed to delete team:', error);
      alert('削除に失敗しました。');
    }
  };

  const saveTeam = async (team: Team) => {
    try {
      if (team.name.trim() === '') {
        alert('チーム名を入力してください');
        return;
      }
      // createdAtが存在する場合は既存データ、存在しない場合は新規作成
      if (team.createdAt) {
        await teamApi.update(team.id, {
          departmentId: team.departmentId,
          name: team.name,
          notes: team.notes,
        });
      } else {
        await teamApi.create({
          departmentId: team.departmentId,
          name: team.name,
          notes: team.notes,
        });
      }
      await onRefresh();
    } catch (error) {
      console.error('Failed to save team:', error);
      alert('保存に失敗しました。');
    }
  };

  // 役職管理
  const addPosition = () => {
    const newPosition: Partial<Position> = {
      id: crypto.randomUUID(),
      organizationId: organization.id,
      name: '',
      notes: null,
      // 新規作成時はcreatedAtを設定しない
    };
    setLocalPositions([...localPositions, newPosition as Position]);
  };

  const updatePosition = (id: string, updates: Partial<Position>) => {
    setLocalPositions(localPositions.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const removePosition = async (id: string) => {
    if (!confirm('この役職を削除しますか？')) return;
    try {
      await positionApi.delete(id);
      await onRefresh();
    } catch (error) {
      console.error('Failed to delete position:', error);
      alert('削除に失敗しました。');
    }
  };

  const savePosition = async (pos: Position) => {
    try {
      if (pos.name.trim() === '') {
        alert('役職名を入力してください');
        return;
      }
      // createdAtが存在する場合は既存データ、存在しない場合は新規作成
      if (pos.createdAt) {
        await positionApi.update(pos.id, {
          name: pos.name,
          notes: pos.notes,
        });
      } else {
        await positionApi.create({
          organizationId: organization.id,
          name: pos.name,
          notes: pos.notes,
        });
      }
      await onRefresh();
    } catch (error) {
      console.error('Failed to save position:', error);
      alert('保存に失敗しました。');
    }
  };

  return (
    <div className="space-y-6">
      {/* 部署管理 */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">部署管理</h2>
          <button
            onClick={addDepartment}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + 部署追加
          </button>
        </div>
        <div className="space-y-3">
          {localDepartments.map((dept) => (
            <div key={dept.id} className="flex gap-3 items-center border p-3 rounded-lg">
              <input
                type="text"
                value={dept.name}
                onChange={(e) => updateDepartment(dept.id, { name: e.target.value })}
                onBlur={() => saveDepartment(dept)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="部署名"
              />
              <input
                type="text"
                value={dept.notes || ''}
                onChange={(e) => updateDepartment(dept.id, { notes: e.target.value || null })}
                onBlur={() => saveDepartment(dept)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="備考"
              />
              <button
                onClick={() => removeDepartment(dept.id)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                削除
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* チーム管理 */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">チーム管理</h2>
          <button
            onClick={addTeam}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={localDepartments.length === 0}
          >
            + チーム追加
          </button>
        </div>
        <div className="space-y-3">
          {localTeams.map((team) => (
            <div key={team.id} className="flex gap-3 items-center border p-3 rounded-lg">
              <select
                value={team.departmentId}
                onChange={(e) => updateTeam(team.id, { departmentId: e.target.value })}
                onBlur={() => saveTeam(team)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                {localDepartments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={team.name}
                onChange={(e) => updateTeam(team.id, { name: e.target.value })}
                onBlur={() => saveTeam(team)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="チーム名"
              />
              <input
                type="text"
                value={team.notes || ''}
                onChange={(e) => updateTeam(team.id, { notes: e.target.value || null })}
                onBlur={() => saveTeam(team)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="備考"
              />
              <button
                onClick={() => removeTeam(team.id)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                削除
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 役職管理 */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">役職管理</h2>
          <button
            onClick={addPosition}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + 役職追加
          </button>
        </div>
        <div className="space-y-3">
          {localPositions.map((pos) => (
            <div key={pos.id} className="flex gap-3 items-center border p-3 rounded-lg">
              <input
                type="text"
                value={pos.name}
                onChange={(e) => updatePosition(pos.id, { name: e.target.value })}
                onBlur={() => savePosition(pos)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="役職名"
              />
              <input
                type="text"
                value={pos.notes || ''}
                onChange={(e) => updatePosition(pos.id, { notes: e.target.value || null })}
                onBlur={() => savePosition(pos)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="備考"
              />
              <button
                onClick={() => removePosition(pos.id)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                削除
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MemberEditModal({
  isOpen,
  onClose,
  member,
  departments,
  teams,
  positions,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  member: OrganizationMember | null;
  departments: Department[];
  teams: Team[];
  positions: Position[];
  onSave: (data: Partial<OrganizationMember>) => Promise<void>;
}) {
  const [formData, setFormData] = useState({
    departmentId: member?.departmentId || '',
    teamId: member?.teamId || '',
    positionId: member?.positionId || '',
    name: member?.name || '',
    employmentType: member?.employmentType || '',
    notes: member?.notes || '',
  });

  useEffect(() => {
    if (member) {
      setFormData({
        departmentId: member.departmentId || '',
        teamId: member.teamId || '',
        positionId: member.positionId || '',
        name: member.name || '',
        employmentType: member.employmentType || '',
        notes: member.notes || '',
      });
    } else {
      setFormData({
        departmentId: departments[0]?.id || '',
        teamId: '',
        positionId: '',
        name: '',
        employmentType: '',
        notes: '',
      });
    }
  }, [member, isOpen, departments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      departmentId: formData.departmentId,
      teamId: formData.teamId || null,
      positionId: formData.positionId || null,
      name: formData.name,
      employmentType: formData.employmentType || null,
      notes: formData.notes || null,
    });
  };

  const getTeamsByDepartment = (departmentId: string) => {
    return teams.filter((t) => t.departmentId === departmentId);
  };

  const availableTeams = getTeamsByDepartment(formData.departmentId);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={member ? 'メンバー編集' : 'メンバー追加'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            部署 <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.departmentId}
            onChange={(e) => {
              setFormData({
                ...formData,
                departmentId: e.target.value,
                teamId: '', // 部署変更時はチームをリセット
              });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">選択してください</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">チーム</label>
          <select
            value={formData.teamId}
            onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            disabled={!formData.departmentId || availableTeams.length === 0}
          >
            <option value="">選択してください</option>
            {availableTeams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            氏名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">役職</label>
          <select
            value={formData.positionId}
            onChange={(e) => setFormData({ ...formData, positionId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">選択してください</option>
            {positions.map((pos) => (
              <option key={pos.id} value={pos.id}>
                {pos.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">雇用形態</label>
          <input
            type="text"
            value={formData.employmentType}
            onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="例: 正社員"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">備考</label>
          <input
            type="text"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {member ? '更新' : '追加'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
