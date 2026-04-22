import { useEffect, useState } from "react";

import { employeeApi } from "../lib/api";
import { PERMISSION_LIST } from "../lib/constants";

export default function RolePermission({ setNotice }) {
  const [matrix, setMatrix] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchPermissions = async () => {
    try {
      const res = await employeeApi.getPermissions();
      setMatrix(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Lỗi lấy ma trận quyền:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchPermissions();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const togglePermission = (roleName, permissionKey) => {
    setMatrix((current) =>
      current.map((item) => {
        if (item.role === roleName) {
          return {
            ...item,
            privileges: {
              ...item.privileges,
              [permissionKey]: !item.privileges[permissionKey],
            },
          };
        }
        return item;
      }),
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await Promise.all(
        matrix.map((item) =>
          employeeApi.updatePermissions({
            role: item.role,
            privileges: item.privileges,
          }),
        ),
      );
      setNotice("Đã lưu cấu hình phân quyền vào database thành công.");
    } catch (err) {
      console.error(err);
      alert("Không thể lưu cấu hình phân quyền. Hãy kiểm tra lại backend.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>Đang tải dữ liệu thực từ MongoDB...</div>
    );
  }

  return (
    <section className="panel">
      <div className="panel-toolbar">
        <button
          type="button"
          className="primary-button"
          onClick={handleSave}
          disabled={saving}
          style={{
            backgroundColor: "#3C2A1A",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {saving ? "Đang lưu..." : "Lưu cấu hình"}
        </button>
      </div>

      <div className="permission-table">
        <div className="permission-row permission-head">
          <span>Quyền hạn</span>
          {matrix.map((item) => (
            <span key={item.role} className="center">
              {item.role}
            </span>
          ))}
        </div>

        {PERMISSION_LIST.map((permission) => (
          <div key={permission.key} className="permission-row">
            <strong>{permission.label}</strong>
            {matrix.map((item) => (
              <label key={item.role} className="permission-toggle">
                <input
                  type="checkbox"
                  checked={item.privileges?.[permission.key] || false}
                  onChange={() => togglePermission(item.role, permission.key)}
                />
              </label>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
