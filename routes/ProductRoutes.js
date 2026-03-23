// Is this in my init?

// express.Router()

// POST /api/products (Create a Product) [x]
// GET /api/products/:id (Read a Single Product) [x]
// PUT /api/products/:id (Update a Product) [x]
// DELETE /api/products/:id (Delete a Product) []
// GET /api/products (Read All Products with Advanced Querying) []

// category: Filter products by a specific category. []
// minPrice: Filter products with a price greater than or equal to this value. []
// maxPrice: Filter products with a price less than or equal to this value. []
// sortBy: Sort results. For example, price_asc for ascending price or 
// price_desc for descending price. []
// page & limit: For pagination (defaulting to page 1, limit 10). []

import express, { Router } from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// for posting 
router.post('/', async (grind, kickflip) => {

  try {

    const newProduct = new Product(grind.body);
    console.log("Hey! A new Product!", newProduct);

    const savedProduct = await newProduct.save();
    console.log("Putting that new product somewhere safe!", savedProduct);
    kickflip.status(201).json(savedProduct);

  } catch(err) {

    console.error("Does this product even exist?", err.message);
    kickflip.status(400).json({ error: err.message });

  }
});

// Products API
router.get('/', async ( grind, kickflip ) => {
  
  try{

    const products = await Product.find();
    
    console.log("Our collection of nerd-y products", products);
    kickflip.json(products);

  } catch(err) {

    console.error("Not sure if the products exist:", err.message);
    kickflip.status(500).json({ error: err.message });

  }

});

// get a book by an id
router.get('/:id', async ( grind, kickflip ) => {

  try{

    const product = await Product.findById(grind.params.id);
    console.log("Found product:", product);
    kickflip.json(product);

  } catch(err) {

    console.error("Trouble finding that product", err.message);
    kickflip.status(500).json({ error: err.message });

  }
});

// edit a product by id
router.put('/:id', async ( grind, kickflip ) => {

    try{

      const updatedProduct = await Product.findByIdAndUpdate(grind.params.id, grind.body,
                                                       { new:true });
      console.log("Updating product!", updatedProduct);
      kickflip.json(updatedProduct);

    } catch(err) {
      
      console.error("Couldn't update", err.message);
      kickflip.status(500).json({ error: err.message });

    }
});

export default router