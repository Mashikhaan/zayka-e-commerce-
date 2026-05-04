/**
 * Server setup (Production ready)
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
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();


// 🔹 ES6 me __dirname banane ka tarika
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// =====================
// 🔹 MIDDLEWARES
// =====================

// JSON data parse karne ke liye
app.use(express.json());

// Form data parse karne ke liye
app.use(express.urlencoded({ extended: true }));

// Cookies handle karne ke liye
app.use(cookieParser());


// 🔹 CORS config (frontend + backend connect karne ke liye)
app.use(cors({
    origin: [
        'http://localhost:5173',                 // local frontend
        'https://zayka-e-commerce.onrender.com' // deployed frontend
    ],
    credentials: true
}));



// =====================
// 🔹 STATIC FILES (Frontend build serve karne ke liye)
// =====================

// 👉 backend/public folder ko serve karega
app.use(express.static(path.join(__dirname, '..', 'public')));



// =====================
// 🔹 API ROUTES
// =====================

// 👉 Ye sab backend APIs hain
app.use('/api/auth', authRouter);
app.use('/api/order', orderRouter);
app.use('/api/product', productRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/cart', cartRouter);
app.use('/api/payment', paymentRouter);



// =====================
// 🔹 SPA FALLBACK (VERY IMPORTANT)
// =====================

// 👉 Agar koi route match nahi hota (React routes),
// to index.html serve karo

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});



// =====================
// 🔹 EXPORT APP
// =====================
export default app;