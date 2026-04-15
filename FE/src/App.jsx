import React, { useEffect, useMemo, useState } from "react";
import DetailDrawer from "./components/DetailDrawer";
import MenuForm from "./components/MenuForm";
import MenuPreview from "./components/MenuPreview";
import MenuTable from "./components/MenuTable";
import Sidebar from "./components/Sidebar";
import StatsStrip from "./components/StatsStrip";
import { categories, emptyForm } from "./data/menuSeed";
import { menuStore } from "./services/menuStore";
import { validateForm } from "./utils/menuHelpers";

const defaultProductImage =
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80";

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let isMounted = true;

    menuStore.getMenuItems().then((items) => {
      if (isMounted) {
        setMenuItems(items);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return menuItems.filter((item) => {
      const isCategoryMatch =
        selectedCategory === categories[0] || item.category === selectedCategory;
      const isSearchMatch =
        !normalizedSearch ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch);

      return isCategoryMatch && isSearchMatch;
    });
  }, [menuItems, searchTerm, selectedCategory]);

  const stats = useMemo(() => {
    const availableCount = menuItems.filter((item) => item.status === "available").length;
    const soldOutCount = menuItems.filter((item) => item.status === "sold_out").length;
    const averagePrice =
      menuItems.length === 0
        ? 0
        : menuItems.reduce((total, item) => total + Number(item.price), 0) / menuItems.length;

    return {
      total: menuItems.length,
      availableCount,
      soldOutCount,
      averagePrice,
    };
  }, [menuItems]);

  function showToast(type, message) {
    setToast({ type, message });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setErrors({});
  }

  function startEdit(item) {
    setEditingId(item.id);
    setSelectedItem(null);
    setForm({
      id: item.id,
      name: item.name,
      price: String(item.price),
      category: item.category,
      status: item.status,
      description: item.description,
      image: item.image,
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      showToast("error", "Kiểm tra lại thông tin món trước khi lưu.");
      return;
    }

    setIsSaving(true);
    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category,
      status: form.status,
      description: form.description.trim(),
      image: form.image.trim() || defaultProductImage,
    };

    try {
      if (editingId) {
        const updatedItem = await menuStore.updateMenuItem(editingId, payload);
        setMenuItems((items) =>
          items.map((item) => (item.id === editingId ? updatedItem : item))
        );
        showToast("success", "Đã cập nhật thông tin món.");
      } else {
        const newItem = await menuStore.createMenuItem(payload);
        setMenuItems((items) => [newItem, ...items]);
        showToast("success", "Đã thêm món mới vào menu.");
      }

      resetForm();
    } catch {
      showToast("error", "Không thể lưu món. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(item) {
    const confirmed = window.confirm(`Xóa "${item.name}" khỏi menu?`);

    if (!confirmed) {
      return;
    }

    try {
      await menuStore.deleteMenuItem(item.id);
      setMenuItems((items) => items.filter((menuItem) => menuItem.id !== item.id));

      if (selectedItem?.id === item.id) {
        setSelectedItem(null);
      }

      if (editingId === item.id) {
        resetForm();
      }

      showToast("success", "Đã xóa món khỏi hệ thống.");
    } catch {
      showToast("error", "Không thể xóa món. Vui lòng thử lại.");
    }
  }

  return (
    <main className="app-shell">
      <Sidebar />

      <section className="workspace" id="menu-management">
        <header className="topbar">
          <div>
            <p className="eyebrow">PB01 - Quản lý menu</p>
            <h1>Dashboard</h1>
          </div>
          <div className="topbar-actions">
            <button className="button secondary" type="button" onClick={resetForm}>
              Làm mới form
            </button>
            <a className="button primary" href="#menu-form">
              Thêm mới
            </a>
          </div>
        </header>

        <StatsStrip stats={stats} />

        <section className="control-grid">
          <MenuForm
            editingId={editingId}
            errors={errors}
            form={form}
            isSaving={isSaving}
            onCancel={resetForm}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
          <MenuPreview form={form} selectedItem={selectedItem} />
        </section>

        <MenuTable
          filteredItems={filteredItems}
          isLoading={isLoading}
          onDelete={handleDelete}
          onEdit={startEdit}
          onSelect={setSelectedItem}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          setSearchTerm={setSearchTerm}
          setSelectedCategory={setSelectedCategory}
        />
      </section>

      <DetailDrawer item={selectedItem} onClose={() => setSelectedItem(null)} onEdit={startEdit} />

      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
    </main>
  );
}

export default App;
