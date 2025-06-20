// backend/routes/productRoutes.js (Using try...catch, no middleware needed)

import express from 'express';
const router = express.Router();
import Product from '../models/productModel.js';

// @desc    Fetch all products (or by category)
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const filters = {};
    if (req.query.category) {
      filters.category = { $regex: `^${req.query.category}$`, $options: 'i' };
    }
    if (req.query.subCategory) { // <-- ADD THIS BLOCK
      filters.subCategory = { $regex: `^${req.query.subCategory}$`, $options: 'i' };
    }

    const products = await Product.find({ ...filters });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Fetch all unique categories
// @route   GET /api/products/categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
// backend/routes/productRoutes.js

// @desc    Fetch all sub-categories for a given main category
// @route   GET /api/products/subcategories/:category
// @access  Public
router.get('/subcategories/:category', async (req, res) => {
  try {
    const categoryName = req.params.category;

    // Find products that EXACTLY match the main category (case-insensitive)
    const products = await Product.find({
      // Using the same strict regex from our previous fix
      category: { $regex: `^${categoryName}$`, $options: 'i' }
    });

    // Now, get the unique sub-categories from ONLY those filtered products
    // We use JavaScript's Set and Array.from to get unique values from the result.
    const subCategories = [...new Set(products.map(p => p.subCategory))];
    
    // Filter out any null or undefined values that might have resulted
    const filteredSubCategories = subCategories.filter(sc => sc);

    res.json(filteredSubCategories);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Fetch a single product by ID
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      // Use 'return' to make sure you don't send two responses
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;