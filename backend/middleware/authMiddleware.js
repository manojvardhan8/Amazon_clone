// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Protect routes
const protect = async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Attach the user object (without the password) to the request
      req.user = await User.findById(decoded.userId).select('-password');
      if (req.user) {
        next(); // User was found, proceed to the next step.
      } else {
        // User was NOT found in the DB, even though the token is valid.
        // This is an invalid session (e.g., user deleted).
        res.status(401).json({ message: 'Not authorized, user not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };