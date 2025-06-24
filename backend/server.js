// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import connectDB from './config/db.js'; // We will create this next
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'; 
import cartRoutes from './routes/cartRoutes.js';
//import { notFound, errorHandler } from './middleware/errorMiddleware.js';
dotenv.config(); // Load environment variables from .env file

connectDB(); // Connect to MongoDB

const app = express();
const allowedOrigins = [
  'http://localhost:3000',  // local dev
  'https://amazon-clone-mu-drab.vercel.app'  // deployed frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Cookie parser middleware
app.use(cookieParser()); 
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
// app.use(notFound);
// app.use(errorHandler);



// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));