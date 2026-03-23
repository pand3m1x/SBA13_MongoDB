// In models/Product.js, define a productSchema with the following fields
//  and validation rules:
// name: String, required. [x]
// description: String, required. [x]
// price: Number, required, must be greater than 0. [x]
// category: String, required. [x]
// inStock: Boolean, defaults to true. [x]
// tags: An Array of Strings. [x]
// createdAt: Date, defaults to the current date and time. [x]
// Compile this schema into a model named Product and export it. [x]

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

// {  
// "name": "", 
// "description" : "" , 
// "price" : "" , 
// "category" : "" , 
// "inStock" : "" , 
// "tags" : "" , 
// createdAt" : ""
// }
 
const Product = mongoose.model("Product", productSchema);

export default Product;
