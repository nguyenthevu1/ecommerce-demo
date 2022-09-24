import express from 'express';
import asyncHandler from 'express-async-handler';
import protectRouter, { checkRole } from '../middleware/auth.js';
import validateRequestSchema from '../middleware/customErrorValidate.js';
import User from '../models/user.model.js';
import { loginSchema, registerSchema } from '../schema/validate.schema.js';
import generateToken from '../utils/generateToken.js';

const userRouter = express.Router();

// LOGIN
userRouter.post(
    '/login',
    loginSchema,
    validateRequestSchema,
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const { password, ...other } = user._doc;
            res.status(200).send({
                ...other,
                token: generateToken(other._id),
            });
        } else {
            res.status(401);
            throw new Error('Invalid Email Or Password');
        }
    }),
);

// REGISTER
userRouter.post(
    '/register',
    registerSchema,
    validateRequestSchema,
    asyncHandler(async (req, res) => {
        const { email, password, name } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            const { password, ...other } = user._doc;
            res.status(201).send(other);
        } else {
            res.status(400);
            throw new Error('Invalid User Data');
        }
    }),
);

// PROFILE
userRouter.get(
    '/profile',
    protectRouter,
    asyncHandler(async (req, res) => {
        if (req.user) {
            res.send(req.user);
        } else {
            res.status(404);
            throw new Error('User Not Found');
        }
    }),
);

// UPDATE
userRouter.put(
    '/profile',
    protectRouter,
    asyncHandler(async (req, res) => {
        if (req.user) {
            const { name, email, password } = req.body;
            req.user.name = name || req.user.name;
            req.user.email = email || req.user.email;

            if (password) {
                req.user.password = password;
            }

            const updatedUser = await req.user.save();

            const { password: pass, ...other } = updatedUser._doc;

            res.send({ ...other, token: generateToken(other._id) });
        } else {
            res.status(404);
            throw new Error('User Not Found');
        }
    }),
);

userRouter.get(
    '/',
    protectRouter,
    checkRole,
    asyncHandler(async (req, res) => {
        const users = await User.find({});
        res.status(200).send({ users });
    }),
);

export default userRouter;
