const express = require('express');
const router = express.Router();
const { createService, getAjaxServices, getServiceById, updateService, deleteService, getAllServices } = require('../controllers/serviceController');
const { serviceValidationRules, validateRequest } = require('../validations/validations');
const authenticateAdmin = require('../middleware/authenticateAdmin');
// const upload = require('../middleware/upload');
const upload = require('../middleware/upload')('uploads/services');

router.get('/services', getAllServices);
router.get('/get-service/:id',authenticateAdmin, getServiceById);
router.post('/add-service', authenticateAdmin,upload.single("service_img"),serviceValidationRules, validateRequest, createService);
router.put('/add-service/:id',authenticateAdmin, upload.single("service_img"),serviceValidationRules, validateRequest, updateService);
router.delete('/delete-service/:id',authenticateAdmin, deleteService);
    
router.post("/ajax/service-list", getAjaxServices);


module.exports = router;