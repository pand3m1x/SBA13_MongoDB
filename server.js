// In server.js:
// Set up your Express application. [x]
// Use the express.json() middleware to parse request bodies. [x]
// Mount your book router at a base path [x]
// Start the server on a specified port. [x]

import express from 'express';
import "dotenv/config"
import connectDB from './db/Connection.js';
import Product from './routes/productRoutes.js'

const port = 1999;
const app = express();

connectDB();

// grind == req | kickflip == res 
app.use(express.json());
app.use('/api/products', Product)

app.get('/', ( grind, kickflip ) => {
  kickflip.status(200).json({message:"Products! Products! Products!"});
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});