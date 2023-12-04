import categoryController from "../../../adapters/controller/category-controller";
import express from 'express'
import { categoryRepositoryInterface } from "../../../application/repositories/category-repo-interface";
import { categoryRepository } from "../../databases/dynamodb/category-repo";
import validator from "../middlewares/validators";
import { catchValidationErrors } from "../middlewares/catch-validation-errors";

const categoryRouter = () => {
    const controller = categoryController(categoryRepositoryInterface, categoryRepository)
    const router = express.Router()

    router.post('/save', validator.validateCategory, catchValidationErrors, controller.addCategory)
    router.get('/', controller.findAllCategories)
    return router
}
export default categoryRouter