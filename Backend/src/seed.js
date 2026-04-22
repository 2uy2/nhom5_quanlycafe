const Permission = require("./models/Permission");
const { ROLE_OPTIONS } = require("./constants/employee");

const permissionsByRole = {
  "Quản trị viên": {
    viewEmployee: true,
    createEmployee: true,
    deleteEmployee: true,
    viewAccount: true,
    editPermission: true,
  },
  "Quản lý": {
    viewEmployee: true,
    createEmployee: true,
    deleteEmployee: false,
    viewAccount: true,
    editPermission: false,
  },
  "Pha chế": {
    viewEmployee: false,
    createEmployee: false,
    deleteEmployee: false,
    viewAccount: false,
    editPermission: false,
  },
  "Phục vụ": {
    viewEmployee: false,
    createEmployee: false,
    deleteEmployee: false,
    viewAccount: false,
    editPermission: false,
  },
};

const seedPermissions = async () => {
  try {
    const count = await Permission.countDocuments();

    if (count > 0) {
      console.log("Ma trận quyền đã tồn tại. Bỏ qua bước khởi tạo.");
      return;
    }

    const roles = ROLE_OPTIONS.map((role) => ({
      role,
      privileges: permissionsByRole[role],
    }));

    await Permission.insertMany(roles);
    console.log("Đã khởi tạo ma trận quyền mẫu lần đầu thành công.");
  } catch (err) {
    console.error("Lỗi khởi tạo phân quyền:", err.message);
  }
};

module.exports = seedPermissions;
