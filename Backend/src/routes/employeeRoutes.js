const express = require("express");
const employeeController = require("../controllers/employeeController");

const router = express.Router();

router.get("/accounts", employeeController.getAllAccounts);
router.put("/accounts/:id", employeeController.updateAccountRole);
router.get("/permissions", employeeController.getPermissions);
router.put("/permissions", employeeController.updatePermissions);

router.get("/", employeeController.getAllEmployees);
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
