import categoryController from "../../../adapters/controller/category-controller";
import express from 'express'
import { categoryRepositoryInterface } from "../../../application/repositories/category-repo-interface";
import { categoryRepository } from "../../databases/dynamodb/category-repo";
import validator from "../middlewares/validators";
import { catchValidationErrors } from "../middlewares/catch-validation-errors";

/**
 * Category Router
 * @returns An Express router containing routes for category-related endpoints.
 */
const categoryRouter = () => {
    const controller = categoryController(categoryRepositoryInterface, categoryRepository);
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
    router.get('/', controller.findAllCategories);

    return router;
};

export default categoryRouter;