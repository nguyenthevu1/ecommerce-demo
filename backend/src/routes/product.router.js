import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/product.model.js';
import protectRouter, { checkRole } from '../middleware/auth.js';
import { createProduct } from '../schema/validate.schema.js';
import validateRequestSchema from '../middleware/customErrorValidate.js';
import minioUpload from '../utils/minioUpload.js';

const productRouter = express.Router();

//CREATE PRODUCT
productRouter.post(
    '/',
    protectRouter,
    checkRole,
    createProduct,
    validateRequestSchema,
    asyncHandler(async (req, res) => {
        const files = req.files['file'];
        const imagePath = await minioUpload('ecommerce', files);

        const product = await Product.create(req.body);
        product.image = imagePath;

        const producted = await product.save();
        return res.status(200).send({
            producted,
        });
    }),
);

//UPDATE PRODUCT
productRouter.put(
    '/:id',
    protectRouter,
    checkRole,
    createProduct,
    validateRequestSchema,
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        const files = req.files['file'];
        const imagePath = await minioUpload('ecommerce', files);
        if (!product) {
            res.status(404);
            throw new Error('Product Not Found');
        }
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = imagePath;
        product.description = req.body.description;
        product.countInStock = req.body.countInStock;

        const newProduct = await product.save();
        return res.status(200).send({
            newProduct,
        });
    }),
);

//DELETE PRODUCT
productRouter.delete(
    '/:id',
    protectRouter,
    checkRole,
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404);
            throw new Error('Product Not Found');
        }
        await product.remove();
        return res.status(200).send({
            success: true,
        });
    }),
);

// GET ALL PRODUCTS
productRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        const pageSize = 5;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword
            ? {
                  name: {
                      $regex: req.query.keyword,
                      $options: 'i',
                  },
              }
            : {};
        const count = await Product.countDocuments({ ...keyword });
        const products = await Product.find({ ...keyword })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ _id: -1 });

        res.status(200).send({
            products,
            page,
            pages: Math.ceil(count / pageSize),
        });
    }),
);

// GET ONE PRODUCT
productRouter.get(
    '/:id',
    asyncHandler(async (req, res, next) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404);
            throw new Error('Product Not Found');
        }

        res.status(200).send({
            product,
        });
    }),
);

// PRODUCT REVIEW
productRouter.post(
    '/review/:id',
    protectRouter,
    asyncHandler(async (req, res, next) => {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReview = await product.reviews.find((r) => {
                return r.user.toString() === req.user._id.toString();
            });

            if (alreadyReview) {
                res.status(400);
                throw new Error('Product Already Reviewed');
            }

            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            product.reviews.push(review);

            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length;

            await product.save();
            res.status(201).send({ message: 'Reviewed Added' });
        }

        res.status(200).send({
            product,
        });
    }),
);

export default productRouter;
