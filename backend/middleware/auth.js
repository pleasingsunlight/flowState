// backend/middleware/auth.js

const jwt = require('jsonwebtoken');

// Middleware to protect routes
module.exports = function (req, res, next) {
  // Get token from headers
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user info to request
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};
