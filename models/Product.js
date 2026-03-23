// In models/Product.js, define a productSchema with the following fields
//  and validation rules:
// name: String, required. []
// description: String, required. []
// price: Number, required, must be greater than 0. []
// category: String, required. []
// inStock: Boolean, defaults to true. []
// tags: An Array of Strings. []
// createdAt: Date, defaults to the current date and time. []
// Compile this schema into a model named Product and export it. []

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true},
  category: { type: String, required: true },
  inStock: {type: Boolean, default: true},
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now}
});
 
const Product = mongoose.model("Product", productSchema);

export default Product;
