import cookieSession from 'cookie-session';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';
import passport from 'passport';
import connectDatabase from './config/connectDb.js';
import importData from './dataImport.js';
import { errorHandler } from './middleware/error.js';
import orderRouter from './routes/order.route.js';
import productRouter from './routes/product.router.js';
import userRouter from './routes/user.route.js';
import loginGoogle from './utils/LoginGoogle.js';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDatabase();
loginGoogle(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
0;
app.use(cookieSession({ name: 'session', keys: ['google'], maxAge: 24 * 60 * 60 * 100 }));

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: '*',
        credentials: true,
    }),
);
app.use(fileUpload());

// API
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/api/users/login',
    }),
);

app.use('/api/import', importData);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

app.get('/', (req, res) => {
    console.log({
        users: req.user,
        authenticate: req.isAuthenticated,
    });
    res.send('hello');
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
