import productController from "../../../adapters/controller/product-controller";
import express from 'express'
import { productRepoInterface } from "../../../application/repositories/product-repo-interface";
import { productRepository } from "../../databases/dynamodb/product-repo";
import validator from "../middlewares/validators";
import { catchValidationErrors } from "../middlewares/catch-validation-errors";
import { categoryRepositoryInterface } from "../../../application/repositories/category-repo-interface";
import { categoryRepository } from "../../databases/dynamodb/category-repo";

const productRouter = () => {

    const controller = productController(productRepoInterface, productRepository, categoryRepositoryInterface, categoryRepository)
    const router = express.Router()

    router.post('/save', validator.validateProduct, catchValidationErrors, controller.addProduct)
    router.get('/list', controller.findProductsByCategory)

    return router

}

export default productRouter