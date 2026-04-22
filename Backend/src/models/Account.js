const mongoose = require("mongoose");

const { ACCOUNT_STATUSES, ROLE_OPTIONS } = require("../constants/employee");

const AccountSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{4}$/,
    },
    employeeId: { type: String, required: true, trim: true },
    role: { type: String, required: true, enum: ROLE_OPTIONS },
    status: {
      type: String,
      default: ACCOUNT_STATUSES.ACTIVE,
      enum: Object.values(ACCOUNT_STATUSES),
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Account", AccountSchema);
