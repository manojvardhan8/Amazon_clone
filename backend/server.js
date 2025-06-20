// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import connectDB from './config/db.js'; // We will create this next
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'; 
dotenv.config(); // Load environment variables from .env file

connectDB(); // Connect to MongoDB

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Allow app to accept JSON data
app.use(express.urlencoded({ extended: true }));


// Cookie parser middleware
app.use(cookieParser()); 
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));