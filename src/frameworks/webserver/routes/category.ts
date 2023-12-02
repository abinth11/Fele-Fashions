import categoryController from "../../../adapters/category-controller";
import express from 'express'
import { categoryRepositoryInterface } from "../../../application/repositories/category-repo-interface";
import { categoryRepository } from "../../databases/dynamodb/category-repo";

const categoryRouter = () =>{
    const controller = categoryController(categoryRepositoryInterface,categoryRepository)
    const router = express.Router()

    router.post('/add',controller.addCategory)
    router.get('/',controller.findAllCategories)
    return router
}
export default categoryRouter