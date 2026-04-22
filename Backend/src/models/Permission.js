const mongoose = require("mongoose");

const { PERMISSION_KEYS, ROLE_OPTIONS } = require("../constants/employee");

const PermissionSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, unique: true, enum: ROLE_OPTIONS },
    privileges: {
      type: new mongoose.Schema(
        PERMISSION_KEYS.reduce((result, key) => {
          result[key] = { type: Boolean, default: false };
          return result;
        }, {}),
        { _id: false },
      ),
      default: {},
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Permission", PermissionSchema);
