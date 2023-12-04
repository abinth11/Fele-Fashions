import categoryController from "../../../adapters/controller/category-controller";
import express from 'express'
import { categoryRepositoryInterface } from "../../../application/repositories/category-repo-interface";
import { categoryRepository } from "../../databases/dynamodb/category-repo";
import validator from "../middlewares/validators";
import { catchValidationErrors } from "../middlewares/catch-validation-errors";
import { RedisClient } from "../../../app";
import { cacheRepositoryInterface } from "../../../application/repositories/cache-repo-interface";
import { cacheRepository } from "../../databases/redis/cache-repository";
import { getCacheMiddleware } from "../middlewares/get-cache";
import CacheKeys from "../../../constants/cache-keys";

/**
 * Category Router
 * @param {object} redisClient - The Redis client instance.
 * @returns An Express router containing routes for category-related endpoints.
 */
const categoryRouter = (redisClient: RedisClient) => {
    const controller = categoryController(
        categoryRepositoryInterface,
        categoryRepository,
        cacheRepositoryInterface,
        cacheRepository,
        redisClient
    );
    const router = express.Router();

    /**
     * Endpoint for adding a new category
     * @route POST /save
     * @param {object} req.body - The category data to be added.
     * @returns {object} JSON response indicating success or failure in adding a new category.
     * @throws {object} JSON response with an error message if the category data is invalid.
     */
    router.post('/save', validator.validateCategory, catchValidationErrors, controller.addCategory);

    /**
     * Endpoint for retrieving all categories
     * @route GET /
     * @returns {object} JSON response containing a list of all categories.
     */
    router.get('/', getCacheMiddleware(CacheKeys.ALL_CATEGORIES, redisClient), controller.findAllCategories);

    return router;
};

export default categoryRouter;