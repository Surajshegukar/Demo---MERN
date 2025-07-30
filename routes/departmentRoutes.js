const express = require("express");
const app = express();
const router = express.Router();

const authenticateAdmin = require("../middleware/authenticateAdmin");
const {
  getAlldepartments,
  getdepartmentById,
  createdepartment,
  updatedepartment,
  deletedepartment,
  getAjaxdepartments,
} = require("../controllers/departmentController");
const {
  departmentValidationRules,
  validateRequest,
} = require("../validations/validations");

router.get("/departments", getAlldepartments);
router.get("/get-department/:id", authenticateAdmin, getdepartmentById);
router.post(
  "/add-department",
  authenticateAdmin,
  departmentValidationRules,
  validateRequest,
  createdepartment
);
router.put(
  "/add-department/:id",
  authenticateAdmin,
  departmentValidationRules,
  validateRequest,
  updatedepartment
);
router.delete("/delete-department/:id", authenticateAdmin, deletedepartment);
router.post("/ajax/department-list", getAjaxdepartments);

module.exports = router;
