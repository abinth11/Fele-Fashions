import { body } from 'express-validator'

const validator = {
    validateProduct: [
        body('productName')
            .notEmpty()
            .withMessage('Product name is required')
            .trim()
            .isLength({ min: 3, max: 50 })
            .isString(),
        body('price')
            .notEmpty()
            .withMessage('Product price is required')
            .trim()
            .isNumeric()
            .custom((value) => {
                const minPrice = 1
                if (parseFloat(value) < minPrice) {
                    throw new Error(`Price must be at least ${minPrice}`);
                }
                return true;
            }),
        body('productImage')
            .notEmpty()
            .withMessage('Product image is required')
            .trim()
            .isString(),
        body('brand')
            .notEmpty()
            .withMessage('Product brand is required')
            .trim()
            .isLength({ min: 3, max: 50 })
            .isString(),
        body('categoryId')
            .notEmpty()
            .withMessage('category id is required')
            .trim()
            .isString()
    ],
    validateCategory: [
        body('categoryName')
            .notEmpty()
            .withMessage('Category name is required')
            .trim()
            .isLength({ min: 3, max: 50 })
            .isString(),
    ]
}

export default validator