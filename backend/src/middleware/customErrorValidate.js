// import {validationResult}
import { validationResult } from 'express-validator';
function validateRequestSchema(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array().map((error) => error.msg);
        return res.status(400).json({ message: error });
    }
    next();
}

export default validateRequestSchema;
