import { useEffect, useState } from "react";
import { DataTable } from "../components/DataTable";
import { Modal } from "../components/Modal";
import { FormField } from "../components/FormField";
import { faqApi, faqCategoryApi } from "../lib/api";

interface Faq {
  id: string;
  categoryId: string;
  category?: string;
  question: string;
  answer?: string;
  visibility: string;
  sortOrder?: number;
  notes?: string;
}

interface FaqCategory {
  id: string;
  name: string;
  sortOrder?: number;
  notes?: string;
}

const visibilityOptions = [
  { value: "internal", label: "社内" },
  { value: "agt", label: "AGT" },
  { value: "public", label: "公開" },
];

const initialFormData = {
  categoryId: "",
  question: "",
  answer: "",
  visibility: "internal",
  sortOrder: 0,
  notes: "",
};

const initialCategoryFormData = {
  name: "",
  sortOrder: 0,
  notes: "",
};

export function FaqPage() {
  const [activeTab, setActiveTab] = useState<"faq" | "category">("faq");
  const [items, setItems] = useState<Faq[]>([]);
  const [categories, setCategories] = useState<FaqCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Faq | null>(null);
  const [editingCategory, setEditingCategory] = useState<FaqCategory | null>(
    null
  );
  const [formData, setFormData] = useState(initialFormData);
  const [categoryFormData, setCategoryFormData] = useState(
    initialCategoryFormData
  );

  const fetchData = async () => {
    try {
      const [faqsData, categoriesData] = await Promise.all([
        faqApi.getAll() as Promise<Faq[]>,
        faqCategoryApi.getAll() as Promise<FaqCategory[]>,
      ]);
      setItems(faqsData);
      setCategories(
        categoriesData.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      );
    } catch (error) {
      console.error("Failed to fetch data:", error);
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
      categoryId: item.categoryId,
      question: item.question,
      answer: item.answer || "",
      visibility: item.visibility,
      sortOrder: item.sortOrder || 0,
      notes: item.notes || "",
    });
    setModalOpen(true);
  };

  const handleCategoryCreate = () => {
    setEditingCategory(null);
    setCategoryFormData(initialCategoryFormData);
    setCategoryModalOpen(true);
  };

  const handleCategoryEdit = (category: FaqCategory) => {
    setEditingCategory(category);
    setCategoryFormData({
      name: category.name,
      sortOrder: category.sortOrder || 0,
      notes: category.notes || "",
    });
    setCategoryModalOpen(true);
  };

  const handleCategoryDelete = async (category: FaqCategory) => {
    if (!confirm("このカテゴリを削除しますか？")) return;
    try {
      await faqCategoryApi.delete(category.id);
      fetchData();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await faqCategoryApi.update(editingCategory.id, categoryFormData);
      } else {
        await faqCategoryApi.create(categoryFormData);
      }
      setCategoryModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to save category:", error);
    }
  };

  const handleDelete = async (item: Faq) => {
    if (!confirm("このFAQを削除しますか？")) return;
    try {
      await faqApi.delete(item.id);
      fetchData();
    } catch (error) {
      console.error("Failed to delete FAQ:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedCategory = categories.find(
        (c) => c.id === formData.categoryId
      );
      const submitData = {
        ...formData,
        category: selectedCategory?.name || "", // 後方互換性のため
      };
      if (editingItem) {
        await faqApi.update(editingItem.id, submitData);
      } else {
        await faqApi.create(submitData);
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to save FAQ:", error);
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || "-";
  };

  const columns = [
    {
      key: "category",
      label: "カテゴリ",
      render: (item: Faq) => getCategoryName(item.categoryId),
    },
    { key: "question", label: "質問" },
    {
      key: "answer",
      label: "回答",
      render: (item: Faq) => (
        <span className="truncate max-w-xs block">
          {item.answer ? `${item.answer.substring(0, 50)}...` : "-"}
        </span>
      ),
    },
    {
      key: "visibility",
      label: "公開範囲",
      render: (item: Faq) => {
        const visibility = visibilityOptions.find(
          (o) => o.value === item.visibility
        );
        const colorClass =
          item.visibility === "public"
            ? "bg-green-100 text-green-700"
            : item.visibility === "agt"
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-gray-700";
        return (
          <span className={`px-2 py-1 text-xs rounded-full ${colorClass}`}>
            {visibility?.label || item.visibility}
          </span>
        );
      },
    },
    { key: "sortOrder", label: "順序" },
  ];

  const categoryColumns = [
    { key: "name", label: "カテゴリ名" },
    { key: "sortOrder", label: "順序" },
    { key: "notes", label: "備考" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">FAQ管理</h1>

      {/* タブ */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("faq")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "faq"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            FAQ
          </button>
          <button
            onClick={() => setActiveTab("category")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "category"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            カテゴリ管理
          </button>
        </nav>
      </div>

      {/* FAQタブ */}
      {activeTab === "faq" && (
        <DataTable
          data={items}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
          title="FAQ一覧"
          loading={loading}
        />
      )}

      {/* カテゴリタブ */}
      {activeTab === "category" && (
        <DataTable
          data={categories}
          columns={categoryColumns}
          onEdit={handleCategoryEdit}
          onDelete={handleCategoryDelete}
          onCreate={handleCategoryCreate}
          title="FAQカテゴリ一覧"
          loading={loading}
        />
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? "FAQ編集" : "FAQ新規作成"}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="カテゴリ"
            name="categoryId"
            type="select"
            value={formData.categoryId}
            onChange={(v) =>
              setFormData({ ...formData, categoryId: String(v) })
            }
            options={categories.map((c) => ({ value: c.id, label: c.name }))}
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
          />
          <FormField
            label="公開範囲"
            name="visibility"
            type="select"
            value={formData.visibility}
            onChange={(v) =>
              setFormData({ ...formData, visibility: String(v) })
            }
            options={visibilityOptions}
            required
          />
          <FormField
            label="順序"
            name="sortOrder"
            type="number"
            value={formData.sortOrder}
            onChange={(v) => setFormData({ ...formData, sortOrder: Number(v) })}
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
              {editingItem ? "更新" : "作成"}
            </button>
          </div>
        </form>
      </Modal>

      {/* カテゴリ編集モーダル */}
      <Modal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        title={editingCategory ? "FAQカテゴリ編集" : "FAQカテゴリ新規作成"}
      >
        <form onSubmit={handleCategorySubmit}>
          <FormField
            label="カテゴリ名"
            name="name"
            value={categoryFormData.name}
            onChange={(v) =>
              setCategoryFormData({ ...categoryFormData, name: String(v) })
            }
            required
          />
          <FormField
            label="順序"
            name="sortOrder"
            type="number"
            value={categoryFormData.sortOrder}
            onChange={(v) =>
              setCategoryFormData({ ...categoryFormData, sortOrder: Number(v) })
            }
          />
          <FormField
            label="備考"
            name="notes"
            type="textarea"
            value={categoryFormData.notes}
            onChange={(v) =>
              setCategoryFormData({ ...categoryFormData, notes: String(v) })
            }
          />
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setCategoryModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingCategory ? "更新" : "作成"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
