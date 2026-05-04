/**
 * =========================================
 *  PRODUCTION READY EXPRESS SERVER 
 * =========================================
 */

import express from 'express';
import authRouter from './routes/auth.route.js';
import orderRouter from './routes/order.route.js';
import productRouter from './routes/product.route.js';
import uploadRouter from './routes/upload.route.js';
import cartRouter from './routes/cart.route.js';
import paymentRouter from './routes/payment.route.js';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();


// =========================================
// __dirname setup (ESM)
// =========================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// =========================================
// MIDDLEWARES
// =========================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// =========================================
// CORS (PRODUCTION SAFE)
// =========================================
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://zayka-e-commerce.onrender.com'
    ],
    credentials: true
}));


// =========================================
//  API ROUTES (ALWAYS FIRST)
// =========================================
app.use('/api/auth', authRouter);
app.use('/api/order', orderRouter);
app.use('/api/product', productRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/cart', cartRouter);
app.use('/api/payment', paymentRouter);


// =========================================
//  STATIC FILES (REACT BUILD)
// =========================================
app.use(express.static(path.join(__dirname, '..', 'public')));


// =========================================
//  SPA FALLBACK (LAST STEP ONLY)
// =========================================
// IMPORTANT: ONLY non-API routes will reach here
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


// =========================================
// EXPORT
// =========================================
export default app;