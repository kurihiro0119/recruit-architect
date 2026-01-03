import { useEffect, useState } from 'react';
import { organizationApi, getAdminApi, getUserApi } from '../lib/api';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { Modal } from '../components/Modal';
import { FormField } from '../components/FormField';
import type { Organization, User, CreateOrganization, CreateUser, UpdateUser } from '@recruit-architect/openapi';

export function AdminPage() {
  const { token } = useAdminAuth();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'organizations' | 'users'>('organizations');
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [orgModalOpen, setOrgModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

  const fetchOrganizations = async () => {
    if (!token) return;
    try {
      const orgs = await organizationApi.getAll() as Organization[];
      setOrganizations(orgs);
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
      alert('組織の取得に失敗しました。');
    }
  };

  const fetchUsers = async (organizationId?: string) => {
    if (!token) return;
    try {
      const userApi = getUserApi(token);
      const usrs = organizationId
        ? await userApi.getAll(organizationId) as User[]
        : await userApi.getAll() as User[];
      setUsers(usrs);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      alert('ユーザーの取得に失敗しました。');
    }
  };

  useEffect(() => {
    if (!token) return;
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchOrganizations(), fetchUsers()]);
      setLoading(false);
    };
    loadData();
  }, [token]);

  const handleCreateOrg = () => {
    setEditingOrg(null);
    setOrgModalOpen(true);
  };

  const handleEditOrg = (org: Organization) => {
    setEditingOrg(org);
    setOrgModalOpen(true);
  };

  const handleDeleteOrg = async (orgId: string) => {
    if (!token) return;
    if (!confirm('この組織を削除しますか？')) return;
    try {
      await organizationApi.delete(orgId);
      await fetchOrganizations();
      if (selectedOrgId === orgId) {
        setSelectedOrgId(null);
        await fetchUsers();
      }
    } catch (error) {
      console.error('Failed to delete organization:', error);
      alert('削除に失敗しました。');
    }
  };

  const handleToggleOrgStatus = async (org: Organization) => {
    if (!token) return;
    const newStatus = org.status === 'active' ? 'inactive' : 'active';
    try {
      await organizationApi.update(org.id, { status: newStatus });
      await fetchOrganizations();
    } catch (error) {
      console.error('Failed to update organization status:', error);
      alert('組織の状態更新に失敗しました。');
    }
  };

  const handleSaveOrg = async (orgData: Partial<CreateOrganization>) => {
    if (!token) return;
    try {
      if (editingOrg) {
        await organizationApi.update(editingOrg.id, orgData);
      } else {
        await organizationApi.create(orgData);
      }
      await fetchOrganizations();
      setOrgModalOpen(false);
      setEditingOrg(null);
    } catch (error) {
      console.error('Failed to save organization:', error);
      alert('保存に失敗しました。');
    }
  };

  const handleCreateUser = () => {
    if (!selectedOrgId) {
      alert('組織を選択してください。');
      return;
    }
    setEditingUser(null);
    setUserModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setUserModalOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!token) return;
    if (!confirm('このユーザーを削除しますか？')) return;
    try {
      const userApi = getUserApi(token);
      await userApi.delete(userId);
      await fetchUsers(selectedOrgId || undefined);
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('削除に失敗しました。');
    }
  };

  const handleSaveUser = async (userData: Partial<CreateUser | UpdateUser>) => {
    if (!token) return;
    try {
      const userApi = getUserApi(token);
      if (editingUser) {
        await userApi.update(editingUser.id, userData);
      } else {
        if (!selectedOrgId) {
          alert('組織を選択してください。');
          return;
        }
        await userApi.create({ ...userData, organizationId: selectedOrgId } as CreateUser);
      }
      await fetchUsers(selectedOrgId || undefined);
      setUserModalOpen(false);
      setEditingUser(null);
    } catch (error) {
      console.error('Failed to save user:', error);
      alert('保存に失敗しました。');
    }
  };

  const handleOrgSelect = async (orgId: string | null) => {
    setSelectedOrgId(orgId);
    await fetchUsers(orgId || undefined);
  };

  if (loading) {
    return <div className="p-6">読み込み中...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">管理者ページ</h1>

      <div className="mb-4">
        <button
          onClick={() => setActiveTab('organizations')}
          className={`px-4 py-2 mr-2 rounded ${
            activeTab === 'organizations'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          組織管理
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded ${
            activeTab === 'users'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          ユーザー管理
        </button>
      </div>

      {activeTab === 'organizations' && (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">組織一覧</h2>
            <button
              onClick={handleCreateOrg}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              組織を作成
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left border-b">組織名</th>
                  <th className="px-4 py-2 text-left border-b">ID</th>
                  <th className="px-4 py-2 text-left border-b">ステータス</th>
                  <th className="px-4 py-2 text-left border-b">作成日時</th>
                  <th className="px-4 py-2 text-left border-b">更新日時</th>
                  <th className="px-4 py-2 text-left border-b">操作</th>
                </tr>
              </thead>
              <tbody>
                {organizations.map((org) => (
                  <tr key={org.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b font-medium">{org.name || '(名前なし)'}</td>
                    <td className="px-4 py-2 border-b text-sm text-gray-500">{org.id}</td>
                    <td className="px-4 py-2 border-b">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          org.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {org.status === 'active' ? '有効' : '停止'}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-b text-sm">
                      {new Date(org.createdAt).toLocaleString('ja-JP')}
                    </td>
                    <td className="px-4 py-2 border-b text-sm">
                      {new Date(org.updatedAt).toLocaleString('ja-JP')}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => handleToggleOrgStatus(org)}
                        className={`px-3 py-1 mr-2 rounded text-sm ${
                          org.status === 'active'
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {org.status === 'active' ? '停止' : '有効化'}
                      </button>
                      <button
                        onClick={() => handleEditOrg(org)}
                        className="px-3 py-1 mr-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                      >
                        編集
                      </button>
                      <button
                        onClick={() => handleDeleteOrg(org.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">組織を選択:</label>
            <select
              value={selectedOrgId || ''}
              onChange={(e) => handleOrgSelect(e.target.value || null)}
              className="px-4 py-2 border rounded w-full max-w-md"
            >
              <option value="">すべての組織</option>
              {organizations
                .filter((org) => org.status === 'active')
                .map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name || org.id}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">ユーザー一覧</h2>
            <button
              onClick={handleCreateUser}
              disabled={!selectedOrgId}
              className={`px-4 py-2 rounded text-white ${
                selectedOrgId
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              ユーザーを作成
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left border-b">組織ID</th>
                  <th className="px-4 py-2 text-left border-b">メールアドレス</th>
                  <th className="px-4 py-2 text-left border-b">名前</th>
                  <th className="px-4 py-2 text-left border-b">作成日時</th>
                  <th className="px-4 py-2 text-left border-b">操作</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{user.organizationId}</td>
                    <td className="px-4 py-2 border-b">{user.email}</td>
                    <td className="px-4 py-2 border-b">{user.name}</td>
                    <td className="px-4 py-2 border-b">
                      {new Date(user.createdAt).toLocaleString('ja-JP')}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="px-3 py-1 mr-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                      >
                        編集
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Organization Modal */}
      <Modal
        isOpen={orgModalOpen}
        onClose={() => {
          setOrgModalOpen(false);
          setEditingOrg(null);
        }}
        title={editingOrg ? '組織を編集' : '組織を作成'}
      >
        <OrgForm
          organization={editingOrg}
          onSave={handleSaveOrg}
          onCancel={() => {
            setOrgModalOpen(false);
            setEditingOrg(null);
          }}
        />
      </Modal>

      {/* User Modal */}
      <Modal
        isOpen={userModalOpen}
        onClose={() => {
          setUserModalOpen(false);
          setEditingUser(null);
        }}
        title={editingUser ? 'ユーザーを編集' : 'ユーザーを作成'}
      >
        <UserForm
          user={editingUser}
          organizationId={selectedOrgId}
          onSave={handleSaveUser}
          onCancel={() => {
            setUserModalOpen(false);
            setEditingUser(null);
          }}
        />
      </Modal>
    </div>
  );
}

function OrgForm({
  organization,
  onSave,
  onCancel,
}: {
  organization: Organization | null;
  onSave: (data: Partial<CreateOrganization>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(organization?.name || '');
  const [status, setStatus] = useState<'active' | 'inactive'>(
    organization?.status || 'active'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="org-name" className="block text-sm font-medium text-gray-700 mb-1">
          組織名
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          id="org-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="org-status" className="block text-sm font-medium text-gray-700 mb-1">
          ステータス
        </label>
        <select
          id="org-status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="active">有効</option>
          <option value="inactive">停止</option>
        </select>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          保存
        </button>
      </div>
    </form>
  );
}

function UserForm({
  user,
  organizationId,
  onSave,
  onCancel,
}: {
  user: User | null;
  organizationId: string | null;
  onSave: (data: Partial<CreateUser | UpdateUser>) => void;
  onCancel: () => void;
}) {
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [notes, setNotes] = useState(user?.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: Partial<CreateUser | UpdateUser> = {
      email,
      name,
      notes: notes || undefined,
    };
    if (password) {
      data.password = password;
    }
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="user-email" className="block text-sm font-medium text-gray-700 mb-1">
          メールアドレス
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          id="user-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="user-password" className="block text-sm font-medium text-gray-700 mb-1">
          {user ? 'パスワード（変更する場合のみ）' : 'パスワード'}
          {!user && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          id="user-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required={!user}
          minLength={8}
        />
      </div>

      <div>
        <label htmlFor="user-name" className="block text-sm font-medium text-gray-700 mb-1">
          名前
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          id="user-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="user-notes" className="block text-sm font-medium text-gray-700 mb-1">
          備考
        </label>
        <textarea
          id="user-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          保存
        </button>
      </div>
    </form>
  );
}

