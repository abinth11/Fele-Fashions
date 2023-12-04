import productController from "../../../adapters/controller/product-controller";
import express from 'express'
import { productRepoInterface } from "../../../application/repositories/product-repo-interface";
import { productRepository } from "../../databases/dynamodb/product-repo";
import validator from "../middlewares/validators";
import { catchValidationErrors } from "../middlewares/catch-validation-errors";
import { categoryRepositoryInterface } from "../../../application/repositories/category-repo-interface";
import { categoryRepository } from "../../databases/dynamodb/category-repo";

/**
 * Product Router
 * @returns An Express router containing routes for product-related endpoints.
 */
const productRouter = () => {
    const controller = productController(
        productRepoInterface,
        productRepository,
        categoryRepositoryInterface,
        categoryRepository
    );

    const router = express.Router();

    /**
     * Endpoint for adding a new product
     * @route POST /save
     * @param {object} req.body - The product data to be added.
     * @returns {object} JSON response indicating success or failure in adding a new product.
     * @throws {object} JSON response with an error message if the product data is invalid.
     */
    router.post('/save', validator.validateProduct, catchValidationErrors, controller.addProduct);

    /**
     * Endpoint for retrieving products by category
     * @route GET /list
     * @param {string} req.query.categoryId - The category ID to filter products.
     * @returns {object} JSON response containing a list of products in the specified category.
     */
    router.get('/list', controller.findProductsByCategory);

    return router;
};

export default productRouter;