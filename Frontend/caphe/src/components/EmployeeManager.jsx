import { useMemo, useState } from "react";

import { employeeApi } from "../lib/api";
import { EMPLOYEE_STATUSES, ROLE_OPTIONS } from "../lib/constants";

const STATUS_OPTIONS = Object.values(EMPLOYEE_STATUSES);
const SORT_OPTIONS = [
  { value: "newest", label: "Mới nhất" },
  { value: "name-asc", label: "Tên A-Z" },
  { value: "name-desc", label: "Tên Z-A" },
];

const createEmployeeCode = () => `#${Math.floor(1000 + Math.random() * 9000)}`;

const createInitialForm = () => ({
  id: createEmployeeCode(),
  name: "",
  role: ROLE_OPTIONS[3],
  status: STATUS_OPTIONS[0],
});

export default function EmployeeManager({
  employees,
  loading,
  refreshEmployees,
  setNotice,
}) {
  const [form, setForm] = useState(createInitialForm);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editForm, setEditForm] = useState({ id: "", name: "", role: "", status: "" });
  const [editSubmitting, setEditSubmitting] = useState(false);

  const summary = useMemo(() => {
    const active = employees.filter(
      (employee) => employee.status === EMPLOYEE_STATUSES.ACTIVE,
    ).length;

    return {
      total: employees.length,
      active,
      onLeave: employees.length - active,
    };
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...employees]
      .filter((employee) => {
        const matchesQuery =
          !normalizedQuery ||
          [employee.name, employee.id, employee.role]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(normalizedQuery));
        const matchesRole = roleFilter === "all" || employee.role === roleFilter;
        const matchesStatus =
          statusFilter === "all" || employee.status === statusFilter;

        return matchesQuery && matchesRole && matchesStatus;
      })
      .sort((left, right) => {
        if (sortBy === "name-asc") {
          return left.name.localeCompare(right.name, "vi");
        }

        if (sortBy === "name-desc") {
          return right.name.localeCompare(left.name, "vi");
        }

        return new Date(right.createdAt || 0) - new Date(left.createdAt || 0);
      });
  }, [employees, query, roleFilter, statusFilter, sortBy]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((current) => ({ ...current, [name]: value }));
  };

  const resetCreateForm = () => {
    setForm(createInitialForm());
  };

  const openEditPanel = (employee) => {
    setEditingEmployee(employee);
    setEditForm({
      id: employee.id,
      name: employee.name,
      role: employee.role,
      status: employee.status,
    });
    setActionError("");
  };

  const closeEditPanel = () => {
    setEditingEmployee(null);
    setEditForm({ id: "", name: "", role: "", status: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setActionError("");

    try {
      setSubmitting(true);
      const payload = {
        ...form,
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
          form.name.trim() || form.id,
        )}`,
      };

      const { data } = await employeeApi.createEmployee(payload);
      setNotice(
        `Đã thêm ${data.employee.name} với tài khoản ${data.account.username}. PIN: ${data.account.password}.`,
      );
      resetCreateForm();
      await refreshEmployees();
    } catch (error) {
      console.error(error);
      setActionError(
        error.response?.data?.message || "Không thể thêm nhân viên mới.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateEmployee = async (event) => {
    event.preventDefault();

    if (!editingEmployee) {
      return;
    }

    try {
      setEditSubmitting(true);
      const payload = {
        ...editForm,
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
          editForm.name.trim() || editForm.id,
        )}`,
      };

      await employeeApi.updateEmployee(editingEmployee._id, payload);
      setNotice(`Đã cập nhật hồ sơ của ${editForm.name}.`);
      closeEditPanel();
      await refreshEmployees();
    } catch (error) {
      console.error(error);
      setActionError(
        error.response?.data?.message || "Không thể cập nhật nhân viên.",
      );
    } finally {
      setEditSubmitting(false);
    }
  };

  const handleDelete = async (employeeId, employeeName) => {
    const isConfirmed = window.confirm(
      `Xóa ${employeeName}? Tài khoản liên kết cũng sẽ bị xóa.`,
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await employeeApi.deleteEmployee(employeeId);
      setNotice(`Đã xóa nhân viên ${employeeName}.`);
      if (editingEmployee?._id === employeeId) {
        closeEditPanel();
      }
      await refreshEmployees();
    } catch (error) {
      console.error(error);
      setActionError(
        error.response?.data?.message || "Không thể xóa nhân viên.",
      );
    }
  };

  return (
    <div className="stack-lg">
      <section className="panel compact-panel">
        <div className="panel-toolbar compact-toolbar">
          <div>
            <p className="eyebrow">Nhân sự</p>
            <h3 className="section-title">Thêm nhanh nhân viên mới</h3>
          </div>

          <div className="inline-summary" aria-label="Tổng quan nhân sự">
            <span className="tag">{summary.total} tổng</span>
            <span className="status active">{summary.active} đang làm</span>
            <span className="status warning">{summary.onLeave} tạm nghỉ</span>
          </div>
        </div>

        <form className="employee-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Mã nhân viên</span>
            <input name="id" value={form.id} onChange={handleChange} required />
          </label>

          <label className="field field-wide">
            <span>Họ và tên</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ví dụ: Nguyễn Minh An"
              required
            />
          </label>

          <label className="field">
            <span>Chức danh</span>
            <select name="role" value={form.role} onChange={handleChange}>
              {ROLE_OPTIONS.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Trạng thái</span>
            <select name="status" value={form.status} onChange={handleChange}>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <div className="form-actions">
            <button type="submit" className="primary-button" disabled={submitting}>
              {submitting ? "Đang lưu..." : "Tạo nhân sự"}
            </button>
            <button type="button" className="ghost-button" onClick={resetCreateForm}>
              Làm mới form
            </button>
          </div>
        </form>

        {actionError ? <div className="notice danger">{actionError}</div> : null}
      </section>

      <section className="panel">
        <div className="panel-toolbar wrap-toolbar">
          <div>
            <p className="eyebrow">Bảng điều phối</p>
            <h3 className="section-title">Danh sách nhân viên</h3>
            <p className="panel-subtitle">
              {filteredEmployees.length} kết quả phù hợp trong tổng số {summary.total} nhân viên.
            </p>
          </div>

          <div className="toolbar-grid">
            <label className="search-box">
              <span className="search-label">Tìm nhanh</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nguyễn, #1024, Pha chế..."
              />
            </label>

            <label className="field mini-field">
              <span>Vai trò</span>
              <select
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
              >
                <option value="all">Tất cả</option>
                {ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>

            <label className="field mini-field">
              <span>Trạng thái</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">Tất cả</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label className="field mini-field">
              <span>Sắp xếp</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="table-shell">
          <div className="data-table employee-grid header">
            <span>Nhân viên</span>
            <span>Chức danh</span>
            <span>Trạng thái</span>
            <span className="align-right">Hành động</span>
          </div>

          <div className="table-scroll">
            {loading ? <div className="empty-state">Đang tải dữ liệu...</div> : null}

            {!loading && filteredEmployees.length === 0 ? (
              <div className="empty-state">
                Không có nhân viên nào khớp điều kiện lọc hiện tại.
              </div>
            ) : null}

            {!loading &&
              filteredEmployees.map((employee) => (
                <div key={employee._id || employee.id} className="data-table employee-grid">
                  <div className="identity">
                    <img src={employee.avatar} alt={employee.name} className="avatar" />
                    <div>
                      <strong>{employee.name}</strong>
                      <p>{employee.id}</p>
                    </div>
                  </div>

                  <span className="tag">{employee.role}</span>
                  <span
                    className={`status ${
                      employee.status === EMPLOYEE_STATUSES.ACTIVE ? "active" : "warning"
                    }`}
                  >
                    {employee.status}
                  </span>

                  <div className="actions-inline">
                    <button
                      type="button"
                      className="ghost-button compact-button"
                      onClick={() => openEditPanel(employee)}
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      className="danger-button compact-button"
                      onClick={() => handleDelete(employee._id, employee.name)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {editingEmployee ? (
        <section className="panel edit-panel">
          <div className="panel-toolbar">
            <div>
              <p className="eyebrow">Chỉnh sửa</p>
              <h3 className="section-title">Cập nhật hồ sơ của {editingEmployee.name}</h3>
            </div>

            <button type="button" className="ghost-button" onClick={closeEditPanel}>
              Đóng
            </button>
          </div>

          <form className="employee-form" onSubmit={handleUpdateEmployee}>
            <label className="field">
              <span>Mã nhân viên</span>
              <input value={editForm.id} disabled />
            </label>

            <label className="field field-wide">
              <span>Họ và tên</span>
              <input
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                required
              />
            </label>

            <label className="field">
              <span>Chức danh</span>
              <select name="role" value={editForm.role} onChange={handleEditChange}>
                {ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Trạng thái</span>
              <select name="status" value={editForm.status} onChange={handleEditChange}>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <div className="form-actions">
              <button type="submit" className="primary-button" disabled={editSubmitting}>
                {editSubmitting ? "Đang cập nhật..." : "Lưu thay đổi"}
              </button>
              <button type="button" className="ghost-button" onClick={closeEditPanel}>
                Hủy
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </div>
  );
}
