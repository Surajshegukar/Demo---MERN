const express = require("express");
const app = express();
const router = express.Router();

const authenticateAdmin = require("../middleware/authenticateAdmin");


const {
  getAlldesignations,
  getdesignationById,
  createdesignation,
  updatedesignation,
  deletedesignation,
  getAjaxdesignations,
} = require("../controllers/designationController");
const {
  designationValidationRules,
  validateRequest,
} = require("../validations/validations");

router.get("/designations", getAlldesignations);

router.get("/get-designation/:id", authenticateAdmin, getdesignationById);
router.post(
  "/add-designation",
  authenticateAdmin,
  designationValidationRules,
  validateRequest,
  createdesignation
);
router.put(
  "/add-designation/:id",
  authenticateAdmin,
  designationValidationRules,
  validateRequest,
  updatedesignation
);
router.delete("/delete-designation/:id", authenticateAdmin, deletedesignation);
router.post("/ajax/designation-list", getAjaxdesignations);

module.exports = router;
