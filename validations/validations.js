const { body, validationResult } = require("express-validator");

const userValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character"),
];

const studentValidationRules = [
  body('first_name')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2, max: 100 }).withMessage('First name must be between 2 and 100 characters'),

  body('last_name')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Last name must be between 2 and 100 characters'),

  body('dob')
    .notEmpty().withMessage('Date of birth is required')
    .isDate().withMessage('Date of birth must be a valid date (YYYY-MM-DD)'),

  body('profile')
    .optional()
    .isString().withMessage('Profile must be a string'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Enter a valid email address')
    .isLength({ max: 150 }).withMessage('Email must be less than 150 characters'),

  body('mobile_no')
    .trim()
    .notEmpty().withMessage('Mobile number is required')
    .isMobilePhone().withMessage('Enter a valid mobile number')
    .isLength({ max: 15 }).withMessage('Mobile number must be at most 15 digits'),

  body('address')
    .trim()
    .notEmpty().withMessage('Address is required'),
];

const serviceValidationRules = [
  body('service_name')
    .trim()
    .notEmpty().withMessage('Service name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Service name must be between 2 and 100 characters'),

  body('service_description')
    .trim()
    .notEmpty().withMessage('Service description is required')
    .isLength({ min: 2, max: 100 }).withMessage('Service description must be between 2 and 100 characters'),

  body('service_img')
    .optional()
    .isString().withMessage('Service Image must be a string'),

];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  next();
};

module.exports = {
    userValidationRules,
    studentValidationRules,
    serviceValidationRules,
    validateId,
    validateRequest
}