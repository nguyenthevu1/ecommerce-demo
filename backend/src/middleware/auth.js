import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';

const protectRouter = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not Authorized');
        }

        if (!token) {
            res.status(401);
            throw new Error('Not Authorized');
        }
    }
});

export const checkRole = asyncHandler(async (req, res, next) => {
    if (!req.user.isAdmin) {
        res.status(403);
        throw new Error('Not Access');
    }
    next();
});
export default protectRouter;
