// backend/utils/seeder.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/productModel.js';
import products from '../data/products.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany(); // Clear out existing products
    await Product.insertMany(products);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}