import express from 'express';
import products from './data/product.js';
import users from './data/user.js';
import Product from './models/product.model.js';
import User from './models/user.model.js';
import asyncHandler from 'express-async-handler';

const importData = express.Router();

importData.post(
    '/users',
    asyncHandler(async (req, res) => {
        await User.deleteMany({});
        const importUsers = await User.insertMany(users);
        res.status(200).send({ importUsers });
    }),
);

importData.post(
    '/products',
    asyncHandler(async (req, res) => {
        await Product.deleteMany({});
        const importProducts = await Product.insertMany(products);
        res.status(200).send({ importProducts });
    }),
);

export default importData;
