// backend/controllers/cartController.js
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
// const getCart = async (req, res) => {
//   try {
//     // This console.log will PROVE if we are reaching this function
//     console.log(`--- Reached getCart controller for user: ${req.user._id} ---`);

//     const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product');

//     if (cart) {
//       res.json(cart);
//     } else {
//       res.status(404).json({ message: 'Cart not found for this user.' });
//     }
//   } catch (error) {
//     console.error('Error in getCart controller:', error);
//     res.status(500).json({ message: 'Server error while fetching cart.' });
//   }
// };
// backend/controllers/cartController.js

const getCart = async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the protect middleware
    console.log(`Searching for cart for user ID: ${userId}`);

    // IMPORTANT: Let's use Mongoose's ability to cast strings to ObjectIds safely
    const cart = await Cart.findOne({ user: userId }).populate('cartItems.product');

    if (cart) {
      console.log(`SUCCESS: Found cart for user ${userId}`);
      return res.json(cart);
    } else {
      // This is the path that is being taken.
      console.log(`FAILURE: No cart found for user ${userId}.`);
      return res.status(404).json({ message: 'Cart not found for this user.' });
    }
  } catch (error) {
    console.error('CRITICAL ERROR in getCart:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
// 
// const addItemToCart = async (req, res) => {
//   const { productId, qty } = req.body;

//   // Find the user's cart
//   const cart = await Cart.findOne({ user: req.user._id });

//   if (cart) {
//     const itemIndex = cart.cartItems.findIndex(
//       (item) => item.product.toString() === productId
//     );

//     if (itemIndex > -1) {
//       // Item already exists, just update the quantity
//       cart.cartItems[itemIndex].qty = qty;
//     } else {
//       // Add a new item with only the product ID and quantity
//       cart.cartItems.push({ product: productId, qty });
//     }
//     const updatedCart = await cart.save();
//     res.status(201).json(updatedCart);
//   } else {
//     res.status(404).json({ message: 'Cart not found' });
//   }
// };
// backend/controllers/cartController.js

const addItemToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      // This part is likely correct, but let's re-verify
      const itemIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.cartItems[itemIndex].qty = qty;
      } else {
        cart.cartItems.push({ product: productId, qty });
      }
      const updatedCart = await cart.save();
      return res.status(201).json(updatedCart); // Use 'return' for good measure
    } else {
      // --- THIS IS THE FIX ---
      // If no cart is found for a logged-in user, it's an error.
      console.log(`ERROR: No cart found for user ${req.user._id} during addItemToCart.`);
      return res.status(404).json({ message: 'Cart not found for this user.' });
    }
  } catch (error) {
    console.error('CRITICAL ERROR in addItemToCart:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};



export { getCart, addItemToCart };