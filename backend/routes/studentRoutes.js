const express = require('express');
const router = express.Router();
const { createStudent, getAjaxStudents, getStudentById, updateStudent, deleteStudent, getAllStudents } = require('../controllers/studentController');
const { studentValidationRules, validateRequest } = require('../validations/validations');
const authenticateAdmin = require('../middleware/authenticateAdmin');
const upload = require('../middleware/upload');



router.get('/students',authenticateAdmin, getAllStudents);
router.get('/students/:id',authenticateAdmin, getStudentById);
router.post('/students', authenticateAdmin,upload.single("profile"),studentValidationRules, validateRequest, createStudent,(req,res)=>{
    console.log(req.body);
});
router.put('/students/:id',authenticateAdmin, upload.single("profile"),studentValidationRules, validateRequest, updateStudent);
router.delete('/students/:id',authenticateAdmin, deleteStudent);

router.post("/ajax/students", getAjaxStudents);


module.exports = router;