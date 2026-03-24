// POST /api/products (Create a Product) [x]
// GET /api/products/:id (Read a Single Product) [x]
// PUT /api/products/:id (Update a Product) [x]
// DELETE /api/products/:id (Delete a Product) [x]
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

// const page = parseInt(req.query.page) || 1;
// const pageSize = parseInt(req.query.limit) || 5;

// grind == req | kickflip == res
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

// delete a product by id
router.delete('/:id', async (grind, kickflip) => {

  try{

    const deletedProduct = await Product.findByIdAndDelete(grind.params.id);
    console.log("Are you sure? Nah kidding, too late, already done.", deletedProduct);
    kickflip.json({ message: "Deleted" });

  } catch (err) {

      console.error("Couldn't delete?", err.message);
      kickflip.status(500).json({ error: err.message });

  }
  
})

// trying to get products by category
router.get("/", async (grind, kickflip) => {
  try {

    // retieve products by category
    const productsCategory = await Product.find({ category: grind.query.category });
    console.log(`Products in category ${grind.query.category}:`, productsCategory);
    kickflip.status(200).json(productsCategory);

  } catch (err) {

    console.error("Couldn't find that category", err.message);
    kickflip.status(400).json({ message: err.message });

  }
});

// Notes from group activities on lesson 5
//    const products = await Product.find({price: {$lte:50}})
      // only include name (1) and explicitly exclude _id (0) (aka projection)
 //      .select({ name: 1, price: 1 , _id: 0}) // 1 = for true (include this info) 0 = for false (Exclude this info)
      // sort documents based on price in descending order (-1)
 //       .sort({ price: -1 }) // -1 or 1 only (-1 most expensive item, 1 is cheapest first)
      // skip the first 5 documents
      // .skip(5)
      // // only retrieve the next 5 (after skipping)
      // .limit(5);

export default router