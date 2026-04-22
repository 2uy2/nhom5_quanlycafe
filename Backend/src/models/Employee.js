const mongoose = require("mongoose");

const { EMPLOYEE_STATUSES, ROLE_OPTIONS } = require("../constants/employee");

const EmployeeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ROLE_OPTIONS,
    },
    status: {
      type: String,
      default: EMPLOYEE_STATUSES.ACTIVE,
      enum: Object.values(EMPLOYEE_STATUSES),
    },
    avatar: {
      type: String,
      default: "https://api.dicebear.com/7.x/adventurer/svg?seed=Default",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Employee", EmployeeSchema);
