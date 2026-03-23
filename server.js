import express from 'express';
import "dotenv/config"
import connectDB from './db/Connection.js';
// import productRoutes from './routes/productRoutes.js'

const port = 1999;
const app = express();

connectDB();

app.use(express.json());
// app.use('/api/products', products)

app.get('/', ( grind, kickflip ) => {
  kickflip.status(200).json({message:"Products! Products! Products!"});
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});