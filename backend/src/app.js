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
import paymentRouter from './routes/payment.route.js';
const app = express();
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173',],
    credentials: true
}))



// static folder
app.use(express.static(path.join(__dirname, '..', '/public')));


//prefix routes
app.use('/api/auth',authRouter);
app.use('/api/order',orderRouter);
app.use('/api/product',productRouter);
app.use('/api/upload',uploadRouter)
app.use('/api/cart',cartRouter)
app.use('/api/payment',paymentRouter)



// SPA fallback (optional)
app.get('*name', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


export default app;