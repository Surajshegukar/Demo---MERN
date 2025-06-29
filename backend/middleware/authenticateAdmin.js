
const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: No token provided',
      data: null,
      error: { code: 'AUTH_NO_TOKEN' },
    });
  }

  const token = authHeader.split(' ')[1];


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid or expired token',
      data: null,
      error: { message: err.message },
    });
  }
};

module.exports = authenticateAdmin;