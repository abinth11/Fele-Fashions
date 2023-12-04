import CategoryRepository from "../../frameworks/databases/dynamodb/category-repo"
import CategoryRepositoryInterface from "../../application/repositories/category-repo-interface"
import expressAsyncHandler from "express-async-handler"
import { Request, Response } from "express"
import { ICategory } from "../../types/category"
import { addCategoryUseCase, findAllCategoriesUseCase } from "../../application/use-cases/category"
import HttpStatusCodes from "../../constants/http-status-codes"
import { RedisClient } from "../../app"
import CacheRepositoryInterface from "../../application/repositories/cache-repo-interface"
import CacheRepository from "../../frameworks/databases/redis/cache-repository"

/**
 * Category Controller
 * @param categoryRepoInterface - The interface for the category repository.
 * @param categoryRepoImpl - The implementation of the category repository.
 * @param cacheRepositoryInterface - The interface of cache repository
 * @param cacheRepositoryImpl - The implementation of the cache repository
 * @param {object} redisClient - The Redis client instance.
 * @returns An object containing functions for handling category-related HTTP requests.
 */
const categoryController = (
    categoryRepoInterface: CategoryRepositoryInterface,
    categoryRepoImpl: CategoryRepository,
    cacheRepositoryInterface:CacheRepositoryInterface,
    cacheRepositoryImpl:CacheRepository,
    redisClient: RedisClient
) => {

    const dbRepositoryCategory = categoryRepoInterface(categoryRepoImpl())
    const dbRepositoryCache = cacheRepositoryInterface(cacheRepositoryImpl(redisClient))

    const addCategory = expressAsyncHandler(async (req: Request, res: Response) => {
        const category: ICategory = req.body
        await addCategoryUseCase(category, dbRepositoryCategory,dbRepositoryCache)
        res.status(HttpStatusCodes.CREATED).json({
            status: 'success',
            message: 'Successfully added new category',
            data: null
        })
    })

    const findAllCategories = expressAsyncHandler(async (req: Request, res: Response) => {
        const query = req.query
        const categories = await findAllCategoriesUseCase(Number(query.limit), Number(query.skip), dbRepositoryCategory,dbRepositoryCache)
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