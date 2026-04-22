const EMPLOYEE_STATUSES = {
  ACTIVE: "ĐANG LÀM VIỆC",
  INACTIVE: "TẠM NGHỈ",
};

const ACCOUNT_STATUSES = {
  ACTIVE: "ĐANG HOẠT ĐỘNG",
  LOCKED: "TẠM KHÓA",
};

const ROLE_OPTIONS = [
  "Quản trị viên",
  "Quản lý",
  "Pha chế",
  "Phục vụ",
];

const PERMISSION_KEYS = [
  "viewEmployee",
  "createEmployee",
  "deleteEmployee",
  "viewAccount",
  "editPermission",
];

module.exports = {
  ACCOUNT_STATUSES,
  EMPLOYEE_STATUSES,
  PERMISSION_KEYS,
  ROLE_OPTIONS,
};
