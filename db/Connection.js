// In your config/connection.js file, establish a connection to your 
// MongoDB Atlas database using Mongoose. []
// Handle both successful connections and connection errors gracefully 
// by logging appropriate messages to the console. []
// Execute this connection logic from server.js. []

import mongoose from "mongoose";
import "dotenv/config"


const connectDB = async() => {

    const uri = process.env.MONGO_URI;

    try{

      await mongoose.connect(uri);
      console.log('MongoDb Connection Established');

    } catch(err) {

      console.log("Failed to connect to the database.")
      console.error(err.message); //Good idea? 

    }
}

export default connectDB