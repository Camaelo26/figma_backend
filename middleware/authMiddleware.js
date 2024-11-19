const jwt = require('jsonwebtoken');

// Get JWT_SECRET from environment variables
const jwtSecret = process.env.JWT_SECRET;

// Ensure JWT_SECRET is defined
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  try {
    // Extract token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // If token is missing
    if (!token) {
      console.warn("Authorization token missing in request headers.");
      return res.status(401).json({ 
        message: 'Authorization token missing. Please log in to access this resource.' 
      });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, jwtSecret);

    // Attach the decoded user ID to the request object
    req.userId = decoded.userId;

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Your session has expired. Please log in again.' });
    }
    return res.status(401).json({ message: 'Invalid token. Please log in again.' });
  }
};

module.exports = authMiddleware;
