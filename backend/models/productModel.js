// backend/models/productModel.js
import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: false }, 
  price: { type: Number, required: true, default: 0 },
  mrp: { type: Number, required: false },
  isBestSeller: { type: Boolean, default: false },
  isLimitedTimeDeal: { type: Boolean, default: false },
  colors: { type: [String], default: [] },
  boughtInPastMonth: { type: Number, default: 0 }, 
  countInStock: { type: Number, required: true, default: 0 },
  rating: {type: Number, required:true,defaul:2 },
  numReviews: {type:Number,required:false}
});

const Product = mongoose.model('Product', productSchema);

export default Product;