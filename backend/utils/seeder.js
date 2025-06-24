// backend/utils/seeder.js (All-in-One Generator and Seeder)

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker'; // <-- Import faker here
import connectDB from '../config/db.js';
import Product from '../models/productModel.js';

dotenv.config();

// --- Product Generation Logic is now inside this file ---
const categoryBlueprints = {
    "Men's Fashion": {
        subCategories: ['T-Shirts', 'Shirts', 'Jeans', 'Shorts'],
        brands: ['Allen Solly', 'U TURN', 'Van Heusen', 'Peter England', 'Generic'],
        nouns: ['Cotton Regular Fit Polo', 'Printed Striped Stylish Shirt', 'Slim Fit Casual Trousers', 'Denim Overdyed Shorts'],
    },
    "Women's Fashion": {
        subCategories: ['Dresses', 'Tops', 'Jeans', 'Skirts'],
        brands: ['Vero Moda', 'Only', 'Global Desi', 'AND', 'Generic'],
        nouns: ['Floral Maxi Dress', 'Solid V-Neck Top', 'High-Waisted Skinny Jeans', 'A-Line Pleated Skirt'],
    },
    Electronics: {
        subCategories: ['Mobiles', 'Laptops', 'Cameras', 'Headphones'],
        brands: ['Apple', 'Samsung', 'Sony', 'Dell', 'HP', 'Bose'],
        nouns: ['Smartphone 128GB', 'Ultrabook 16GB RAM', 'Mirrorless Camera Kit', 'Noise Cancelling Headphones'],
    },
    Books: {
        subCategories: ['Fiction', 'Science', 'History', 'Business'],
        brands: ['Penguin Random House', 'HarperCollins', 'Simon & Schuster', 'Hachette'],
        nouns: ['Hardcover Edition', 'Paperback', 'The Ultimate Guide', 'An Illustrated History'],
    },
};

const generateProducts = (count) => {
    const products = [];
    const categoryNames = Object.keys(categoryBlueprints);

    for (let i = 0; i < count; i++) {
        const randomCategoryName = faker.helpers.arrayElement(categoryNames);
        const blueprint = categoryBlueprints[randomCategoryName];
        const randomSubCategory = faker.helpers.arrayElement(blueprint.subCategories);
        const randomBrand = faker.helpers.arrayElement(blueprint.brands);
        const randomNoun = faker.helpers.arrayElement(blueprint.nouns);
        const productName = `${randomBrand} ${randomNoun}`;
        const mrp = faker.commerce.price({ min: 500, max: 5000, dec: 0 });
        const price = faker.commerce.price({ min: 400, max: parseInt(mrp), dec: 0 });
        const rating = faker.number.float({ min: 3.5, max: 5, multipleOf: 0.1 });
        
        const product = {
            name: productName,
            image: `https://placehold.co/600x400/EFEFEF/333?text=${encodeURIComponent(productName.substring(0, 20))}`,
            description: faker.lorem.paragraph(),
            brand: randomBrand,
            category: randomCategoryName,
            subCategory: randomSubCategory,
            price: parseInt(price),
            mrp: parseInt(mrp),
            countInStock: faker.number.int({ min: 0, max: 100 }),
            rating: rating,
            numReviews: faker.number.int({ min: 10, max: 2000 }),
            isBestSeller: faker.datatype.boolean(0.2),
            isLimitedTimeDeal: faker.datatype.boolean(0.15),
            colors: faker.helpers.arrayElements(['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#008000'], { min: 1, max: 4 }),
            boughtInPastMonth: faker.number.int({ min: 50, max: 5000 }),
        };
        products.push(product);
    }
    return products;
};
// --- End of Generation Logic ---

const importData = async () => {
  try {
    await connectDB(); // Ensure DB is connected

    await Product.deleteMany();
    console.log('Old products destroyed...');

    // Generate 100 products in memory
    const productsToSeed = generateProducts(100);
    console.log('100 new products generated in memory...');

    await Product.insertMany(productsToSeed);
    console.log('Generated Data Imported Successfully!');
    
    process.exit();
  } catch (error) {
    console.error(`Error during import: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB(); // Ensure DB is connected

    await Product.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error during destroy: ${error}`);
    process.exit(1);
  }
};

// This checks the command line argument, e.g., 'npm run data:destroy'
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}