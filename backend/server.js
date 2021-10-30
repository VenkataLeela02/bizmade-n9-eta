import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config();

connectDB();

const app = express();

app.use(express.json())

app.use('/api/products', productRoutes)

app.use('/api/orders', orderRoutes)

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} mode`)
);
