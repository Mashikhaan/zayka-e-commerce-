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
// ES6 __dirname setup
// =========================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// =========================================
// MIDDLEWARES
// =========================================

// JSON body parser
app.use(express.json());

// URL encoded form data parser
app.use(express.urlencoded({ extended: true }));

// Cookies parser
app.use(cookieParser());


// =========================================
// CORS CONFIG (IMPORTANT FOR PRODUCTION)
// =========================================
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://zayka-e-commerce.onrender.com'
    ],
    credentials: true
}));


// =========================================
// STATIC FILES (FRONTEND BUILD)
// =========================================
// backend/public folder serve karega
app.use(express.static(path.join(__dirname, '..', 'public')));


// =========================================
// API ROUTES (IMPORTANT: ALWAYS FIRST)
// =========================================
app.use('/api/auth', authRouter);
app.use('/api/order', orderRouter);
app.use('/api/product', productRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/cart', cartRouter);
app.use('/api/payment', paymentRouter);


// =========================================
// SPA FALLBACK (REACT ROUTING SUPPORT)
// =========================================
// IMPORTANT: ONLY non-API routes ko catch karega

app.use((req, res, next) => {
    // agar API request hai → next middleware (404 ya error handle karega)
    if (req.path.startsWith('/api')) {
        return next();
    }

    // otherwise React app serve karo
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


// =========================================
// EXPORT
// =========================================
export default app;