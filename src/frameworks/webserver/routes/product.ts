import productController from "../../../adapters/controller/product-controller";
import express from 'express'
import { productRepoInterface } from "../../../application/repositories/product-repo-interface";
import { productRepository } from "../../databases/dynamodb/product-repo";
import validator from "../middlewares/validators";
import { catchValidationErrors } from "../middlewares/catch-validation-errors";
import { categoryRepositoryInterface } from "../../../application/repositories/category-repo-interface";
import { categoryRepository } from "../../databases/dynamodb/category-repo";
import { RedisClient } from "../../../app";
import { cacheRepositoryInterface } from "../../../application/repositories/cache-repo-interface";
import { cacheRepository } from "../../databases/redis/cache-repository";
import { getCacheMiddleware } from "../middlewares/get-cache";
import CacheKeys from "../../../constants/cache-keys";

/**
 * Product Router
 * @param {object} redisClient - The Redis client instance.
 * @returns An Express router containing routes for product-related endpoints.
 */
const productRouter = (redisClient: RedisClient) => {
    const controller = productController(
        productRepoInterface,
        productRepository,
        categoryRepositoryInterface,
        categoryRepository,
        cacheRepositoryInterface,
        cacheRepository,
        redisClient
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
    router.get('/list', getCacheMiddleware(CacheKeys.PRODUCTS_BY_CATEGORY, redisClient), controller.findProductsByCategory);

    return router;
};

export default productRouter;