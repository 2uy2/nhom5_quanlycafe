import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

export const employeeApi = {
  getEmployees: () => api.get("/employees"),
  createEmployee: (payload) => api.post("/employees", payload),
  updateEmployee: (id, payload) => api.put(`/employees/${id}`, payload),
  deleteEmployee: (id) => api.delete(`/employees/${id}`),
  getAccounts: () => api.get("/employees/accounts"),
  updateAccountRole: (id, payload) => api.put(`/employees/accounts/${id}`, payload),
  getPermissions: () => api.get("/employees/permissions"),
  updatePermissions: (payload) => api.put("/employees/permissions", payload),
};

export default api;
