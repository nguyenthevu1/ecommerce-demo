import { body } from 'express-validator';

export const registerSchema = [
    body('email')
        .notEmpty()
        .withMessage('Please enter email')
        .isEmail()
        .withMessage('Email must contain a valid email address'),
    body('password')
        .notEmpty()
        .withMessage('Please enter password')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
        .withMessage(
            'Password must be at least 8 characters long,Password needs at least one capitalization and numeric characters',
        ),
    body('name').notEmpty().withMessage('Please enter username'),
];

export const loginSchema = [
    body('email')
        .notEmpty()
        .withMessage('Please enter email')
        .isEmail()
        .withMessage('Email must contain a valid email address'),
];

export const createProduct = [
    body('name').notEmpty().withMessage('Please enter name'),
    body('price').notEmpty().isNumeric().withMessage('Please enter name'),
    body('description').notEmpty().withMessage('Please enter description'),
    body('countInStock')
        .notEmpty()
        .isNumeric()
        .withMessage('Please enter product quantity'),
];
