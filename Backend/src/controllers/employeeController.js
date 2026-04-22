const Employee = require("../models/Employee");
const Account = require("../models/Account");
const Permission = require("../models/Permission");
const {
  ACCOUNT_STATUSES,
  EMPLOYEE_STATUSES,
  PERMISSION_KEYS,
  ROLE_OPTIONS,
} = require("../constants/employee");
const { createUniqueAccountPassword } = require("../utils/accountPassword");

const normalizeVietnamese = (value = "") =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");

const buildUsername = (name, employeeCode) => {
  const compactName = normalizeVietnamese(name)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  return `${compactName}${employeeCode.replace("#", "")}`;
};

const buildAvatarUrl = ({ name, id }) =>
  `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
    String(name || "").trim() || String(id || "").trim() || "Default",
  )}`;

const sanitizeEmployeePayload = (body = {}) => ({
  id: String(body.id || "").trim(),
  name: String(body.name || "").trim(),
  role: String(body.role || "").trim(),
  status: String(body.status || EMPLOYEE_STATUSES.ACTIVE).trim(),
  avatar: String(body.avatar || "").trim() || buildAvatarUrl(body),
});

const sanitizePermissionPayload = (privileges = {}) =>
  PERMISSION_KEYS.reduce((result, key) => {
    result[key] = Boolean(privileges[key]);
    return result;
  }, {});

const createUniqueUsername = async (name, employeeCode) => {
  const baseUsername = buildUsername(name, employeeCode);
  let username = baseUsername;
  let suffix = 1;

  while (await Account.exists({ username })) {
    username = `${baseUsername}${suffix}`;
    suffix += 1;
  }

  return username;
};

const validateEmployeePayload = ({ id, name, role, status }) => {
  if (!id || !name || !role) {
    return "Thiếu thông tin bắt buộc: mã nhân viên, tên hoặc chức danh.";
  }
  if (!/^#\d{3,6}$/.test(id)) {
    return "Mã nhân viên phải có dạng #001 hoặc #1234.";
  }
  if (String(name).trim().length < 2) {
    return "Tên nhân viên phải có ít nhất 2 ký tự.";
  }
  if (!ROLE_OPTIONS.includes(role)) {
    return "Chức danh không hợp lệ.";
  }
  if (!Object.values(EMPLOYEE_STATUSES).includes(status)) {
    return "Trạng thái nhân viên không hợp lệ.";
  }
  return null;
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 }).lean();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Không thể tải danh sách nhân viên." });
  }
};

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().sort({ createdAt: -1 }).lean();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Không thể tải danh sách tài khoản." });
  }
};

exports.createEmployee = async (req, res) => {
  let createdEmployeeId = null;

  try {
    const employeeData = sanitizeEmployeePayload(req.body);
    const payloadError = validateEmployeePayload(employeeData);

    if (payloadError) {
      return res.status(400).json({ message: payloadError });
    }

    const employeeExists = await Employee.findOne({ id: employeeData.id }).lean();
    if (employeeExists) {
      return res.status(409).json({ message: "Mã nhân viên đã tồn tại." });
    }

    const generatedUsername = await createUniqueUsername(
      employeeData.name,
      employeeData.id,
    );
    const generatedPassword = await createUniqueAccountPassword();
    const newEmployee = await Employee.create(employeeData);
    createdEmployeeId = newEmployee._id;

    const newAccount = await Account.create({
      username: generatedUsername,
      password: generatedPassword,
      employeeId: newEmployee.id,
      role: employeeData.role,
      status: ACCOUNT_STATUSES.ACTIVE,
    });

    res.status(201).json({
      message: "Tạo nhân sự thành công.",
      employee: newEmployee,
      account: newAccount,
    });
  } catch (error) {
    if (createdEmployeeId) {
      await Employee.findByIdAndDelete(createdEmployeeId);
    }

    if (error?.code === 11000) {
      return res
        .status(409)
        .json({ message: "Tài khoản vừa tạo đã bị trùng dữ liệu." });
    }

    res.status(500).json({ message: "Lỗi tạo nhân sự." });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employeeData = sanitizeEmployeePayload(req.body);
    const payloadError = validateEmployeePayload(employeeData);

    if (payloadError) {
      return res.status(400).json({ message: payloadError });
    }

    const duplicateEmployee = await Employee.findOne({
      id: employeeData.id,
      _id: { $ne: req.params.id },
    }).lean();

    if (duplicateEmployee) {
      return res.status(409).json({ message: "Mã nhân viên đã tồn tại." });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      employeeData,
      { new: true, runValidators: true },
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Không tìm thấy nhân viên." });
    }

    await Account.findOneAndUpdate(
      { employeeId: updatedEmployee.id },
      { role: updatedEmployee.role },
    );

    res.json({ message: "Cập nhật thành công.", employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật nhân viên." });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Không tìm thấy nhân viên." });
    }

    await Account.findOneAndDelete({ employeeId: employee.id });
    await Employee.findByIdAndDelete(req.params.id);

    res.json({ message: "Xóa thành công." });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa nhân viên." });
  }
};

exports.updateAccountRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!ROLE_OPTIONS.includes(role)) {
      return res.status(400).json({ message: "Vai trò không hợp lệ." });
    }

    const account = await Account.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true },
    );

    if (!account) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản." });
    }

    await Employee.findOneAndUpdate({ id: account.employeeId }, { role });

    res.json({
      message: "Cập nhật role thành công.",
      account,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật role." });
  }
};

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find().sort({ createdAt: 1 }).lean();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: "Không thể tải ma trận phân quyền." });
  }
};

exports.updatePermissions = async (req, res) => {
  try {
    const { role, privileges } = req.body;

    if (!ROLE_OPTIONS.includes(role)) {
      return res.status(400).json({ message: "Vai trò không hợp lệ." });
    }

    const updatedPermission = await Permission.findOneAndUpdate(
      { role },
      { privileges: sanitizePermissionPayload(privileges) },
      { new: true, runValidators: true },
    );

    if (!updatedPermission) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy cấu hình quyền cho vai trò này." });
    }

    res.json({ message: "Cập nhật quyền thành công.", data: updatedPermission });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi hệ thống khi cập nhật phân quyền." });
  }
};
