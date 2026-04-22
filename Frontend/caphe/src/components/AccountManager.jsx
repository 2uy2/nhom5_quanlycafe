import { useEffect, useState } from "react";

import { employeeApi } from "../lib/api";
import { ROLE_OPTIONS } from "../lib/constants";

export default function AccountManager({ refreshEmployees, setNotice }) {
  const [accounts, setAccounts] = useState([]);
  const [pendingRoles, setPendingRoles] = useState({});
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const { data } = await employeeApi.getAccounts();
      setAccounts(data);
      setError("");
    } catch (fetchError) {
      console.error(fetchError);
      setError("Không thể tải danh sách tài khoản.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchAccounts();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const togglePasswordVisibility = (accountId) => {
    setVisiblePasswords((current) => ({
      ...current,
      [accountId]: !current[accountId],
    }));
  };

  const handleSelectRole = (accountId, role) => {
    setPendingRoles((current) => ({ ...current, [accountId]: role }));
  };

  const handleSaveRole = async (accountId) => {
    const role = pendingRoles[accountId];

    try {
      await employeeApi.updateAccountRole(accountId, { role });
      setAccounts((current) =>
        current.map((account) =>
          account._id === accountId ? { ...account, role } : account,
        ),
      );
      setPendingRoles((current) => {
        const next = { ...current };
        delete next[accountId];
        return next;
      });
      setNotice("Đã cập nhật chức vụ tài khoản và đồng bộ nhân viên.");
      await refreshEmployees();
    } catch (saveError) {
      console.error(saveError);
      setError(
        saveError.response?.data?.message || "Không thể cập nhật chức vụ.",
      );
    }
  };

  return (
    <div className="stack-lg">
      <section className="panel">
        <div className="panel-toolbar">
          <div>
            <p className="eyebrow">Tài khoản hệ thống</p>
            <h3 className="section-title">
              Quản lý role và xem hoặc ẩn PIN 4 số của từng tài khoản.
            </h3>
          </div>

          <button type="button" className="ghost-button" onClick={fetchAccounts}>
            Tải lại tài khoản
          </button>
        </div>

        {error ? <div className="notice danger">{error}</div> : null}

        {loading ? <div className="empty-state">Đang tải tài khoản...</div> : null}

        {!loading && accounts.length === 0 ? (
          <div className="empty-state">Chưa có tài khoản nào được tạo.</div>
        ) : null}

        <div className="card-grid">
          {accounts.map((account) => {
            const selectedRole = pendingRoles[account._id] ?? account.role;
            const isDirty = selectedRole !== account.role;
            const isPasswordVisible = Boolean(visiblePasswords[account._id]);

            return (
              <article key={account._id} className="account-card">
                <div className="account-header">
                  <div className="account-avatar">
                    {account.username.slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <h4>{account.username}</h4>
                    <p>{account.employeeId}</p>
                  </div>
                </div>

                <div className="account-meta">
                  <span>
                    PIN đăng nhập:{" "}
                    <strong style={{ letterSpacing: "0.2em" }}>
                      {isPasswordVisible ? account.password : "••••"}
                    </strong>
                  </span>
                  <span>
                    Tạo ngày: {new Date(account.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>

                <button
                  type="button"
                  className="ghost-button"
                  onClick={() => togglePasswordVisibility(account._id)}
                >
                  {isPasswordVisible ? "Ẩn PIN" : "Xem PIN"}
                </button>

                <label className="field">
                  <span>Vai trò hệ thống</span>
                  <select
                    value={selectedRole}
                    onChange={(event) => handleSelectRole(account._id, event.target.value)}
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </label>

                {isDirty ? (
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => handleSaveRole(account._id)}
                  >
                    Lưu thay đổi
                  </button>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
