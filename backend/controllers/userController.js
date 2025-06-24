// backend/controllers/userController.js
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import Cart from '../models/cartModel.js'; 

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, email, password });

  if (user) {
    // --- CREATE THE CART ---
    console.log(`--- User Created with ID: ${user._id} ---`);

    // Create the cart for the new user
    const newCart = await Cart.create({ user: user._id, cartItems: [] });
    console.log(`--- Cart Created with user ID: ${newCart.user} ---`);

    // -----------------------

    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};


export { authUser, registerUser };