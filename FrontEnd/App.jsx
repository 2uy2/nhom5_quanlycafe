// ================================
// FILE: App.jsx
// ================================
import { useState } from "react";

export default function App() {
  const [tables, setTables] = useState([
    { code: "B01", seats: 2, status: "Trống" },
    { code: "B02", seats: 4, status: "Đang sử dụng" },
    { code: "B03", seats: 6, status: "Đặt trước" },
    { code: "B04", seats: 2, status: "Trống" },
    { code: "B05", seats: 4, status: "Đang sử dụng" },
    { code: "B06", seats: 8, status: "Trống" },
  ]);

  const [selectedTable, setSelectedTable] = useState(null);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Trống":
        return "bg-green-100 text-green-700";
      case "Đang sử dụng":
        return "bg-red-100 text-red-700";
      case "Đặt trước":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const assignOrder = () => {
    if (!selectedTable) return;
    setTables((prev) =>
      prev.map((t) =>
        t.code === selectedTable ? { ...t, status: "Đang sử dụng" } : t
      )
    );
  };

  const resetTable = () => {
    if (!selectedTable) return;
    setTables((prev) =>
      prev.map((t) =>
        t.code === selectedTable ? { ...t, status: "Trống" } : t
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Quản lý bàn quán cà phê
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Sơ đồ bàn</h2>
                <div className="flex gap-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
                    Làm mới
                  </button>
                  <button className="bg-gray-200 px-4 py-2 rounded-xl">
                    Sơ đồ
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {tables.map((table) => (
                  <div
                    key={table.code}
                    onClick={() => setSelectedTable(table.code)}
                    className={`border p-4 rounded-2xl cursor-pointer ${{
                      true: "ring-2 ring-blue-500",
                    }[selectedTable === table.code]}`}
                  >
                    <div className="flex justify-between">
                      <span className="font-bold">{table.code}</span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(
                          table.status
                        )}`}
                      >
                        {table.status}
                      </span>
                    </div>
                    <p className="text-sm">Số chỗ: {table.seats}</p>
                    <p className="text-xs text-gray-500">
                      Đơn: ORD{table.code.slice(1)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
