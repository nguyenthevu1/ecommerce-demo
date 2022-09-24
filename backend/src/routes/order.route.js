import express from 'express';
import asyncHandler from 'express-async-handler';
import protectRouter, { checkRole } from '../middleware/auth.js';
import Order from '../models/order.model.js';

const orderRouter = express.Router();

// CREATE ORDER
orderRouter.post(
    '/',
    protectRouter,
    asyncHandler(async (req, res) => {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        console.log(req.body);

        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error('No order items');
        } else {
            console.log('done0');
            const order = new Order({
                orderItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                user: req.user._id,
            });
            console.log('done1');
            const createOrder = await order.save();
            console.log('done2');
            res.status(201).send(createOrder);
        }
    }),
);

// ORDER OF USER
orderRouter.get(
    '/',
    protectRouter,
    asyncHandler(async (req, res) => {
        const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });

        res.status(200).send(order);
    }),
);

// ORDER IS PAID
orderRouter.put(
    '/pay/:id',
    protectRouter,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.params.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };

            const updatedOrder = await order.save();
            res.status(200).send(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

orderRouter.get(
    '/turnover',
    protectRouter,
    asyncHandler(async (req, res) => {
        const turnoverMonth = await Order.aggregate([
            {
                $project: {
                    month: { $month: '$createdAt' },
                    sum: '$totalPrice',
                },
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: '$sum' },
                },
            },
        ]);

        res.send({
            turnoverMonth,
        });
    }),
);

//LIST ORDER
orderRouter.get(
    '/all',
    protectRouter,
    asyncHandler(async (req, res) => {
        const order = await Order.find({}).populate('user', 'name email');
        res.status(200).send(order);
    }),
);

orderRouter.put(
    '/update/:id',
    protectRouter,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            if (!order.isPaid) {
                res.status(404);
                throw new Error('Order is not Paid');
            }
            if (order.isDelivered) {
                res.status(404);
                throw new Error('Order Delivered');
            }

            order.isDelivered = true;
            order.deliveredAt = new Date();
            await order.save();
            res.status(200).send({
                success: true,
            });
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// ORDER DETAILS
orderRouter.get(
    '/:id',
    protectRouter,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            res.status(200).send(order);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

export default orderRouter;
