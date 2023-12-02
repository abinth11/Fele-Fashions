import CategoryRepository from "../frameworks/databases/dynamodb/category-repo"
import CategoryRepositoryInterface from "../application/repositories/category-repo-interface"
import expressAsyncHandler from "express-async-handler"
import { Request, Response } from "express"
import { ICategory } from "../types/category"
import { addCategoryUseCase, findAllCategoriesUseCase } from "../application/use-cases/category"
import HttpStatusCodes from "../constants/http-status-codes"
const categoryController = (categoryRepoInterface: CategoryRepositoryInterface, categoryRepoImpl: CategoryRepository) => {

    const dbRepositoryCategory = categoryRepoInterface(categoryRepoImpl())

    const addCategory = expressAsyncHandler(async (req: Request, res: Response) => {
        const category: ICategory = req.body
        await addCategoryUseCase(category, dbRepositoryCategory)
        res.status(HttpStatusCodes.CREATED).json({
            status: 'success',
            message: 'Successfully added new category',
            data: null
        })
    })

    const findAllCategories = expressAsyncHandler(async (req: Request, res: Response) => {
        const query = req.query
        const categories = await findAllCategoriesUseCase(Number(query.limit), Number(query.offset), dbRepositoryCategory)
        res.status(HttpStatusCodes.OK).json({
            status: 'success',
            message: 'Successfully retrieved all categories',
            data: categories
        })
    })

    return {
        addCategory,
        findAllCategories
    }
}

export default categoryController