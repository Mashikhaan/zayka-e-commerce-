/**
 * server create
 * server config
 */
import express from 'express';
import authRouter from './routes/auth.route.js';
import orderRouter from './routes/order.route.js';
import cookieParser from 'cookie-parser';
import productRouter from './routes/product.route.js';
import cors from 'cors';
import uploadRouter from './routes/upload.route.js';
import cartRouter from './routes/cart.route.js';
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173',],
    credentials: true
}))

//prefix routes
app.use('/api/auth',authRouter);
app.use('/api/order',orderRouter);
app.use('/api/product',productRouter);
app.use('/api/upload',uploadRouter)
app.use('/api/cart',cartRouter)



export default app;