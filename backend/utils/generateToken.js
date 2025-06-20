// backend/utils/generateToken.js
import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  // Create the token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });

  // Set JWT as an HTTP-Only cookie
  // This is more secure than local storage as it's not accessible by client-side JavaScript,
  // which protects against XSS attacks.
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevents CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });
};

export default generateToken;