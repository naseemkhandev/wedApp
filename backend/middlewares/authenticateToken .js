const jwt = require('jsonwebtoken');

const crypto = require('crypto');
const secretKey = 'AZMOIHTF&^16^%&@^*&56UTGUGFWY!DUYWUD&^%!'






const authenticateToken = (req, res, next) => {
  // Get the JWT token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authentication token not found' });
  }

  try {
    // Verify and decode the token
    const decodedToken = jwt.verify(token, secretKey);

    req.user = decodedToken;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid authentication token' });
  }
};

module.exports = authenticateToken;
