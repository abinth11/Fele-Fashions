import expressAsyncHandler from "express-async-handler";
import ProductRepositoryInterface from "../../application/repositories/product-repo-interface";
import ProductRepository from "../../frameworks/databases/dynamodb/product-repo";
import { Request, Response } from 'express'
import { IProduct } from "../../types/product";
import { addProductUseCase, findProductsByCategoryUseCase } from "../../application/use-cases/product";
import HttpStatusCodes from "../../constants/http-status-codes";
import CategoryRepositoryInterface from "../../application/repositories/category-repo-interface";
import CategoryRepository from "../../frameworks/databases/dynamodb/category-repo";

/**
 * Product Controller
 * @param productRepositoryInterface - The interface for the product repository.
 * @param productRepoImpl - The implementation of the product repository.
 * @param categoryRepositoryInterface - The interface for the category repository.
 * @param categoryRepoImpl - The implementation of the category repository.
 * @returns An object containing functions for handling product-related HTTP requests.
 */
const productController = (
    productRepositoryInterface: ProductRepositoryInterface,
    productRepoImpl: ProductRepository,
    categoryRepositoryInterface: CategoryRepositoryInterface,
    categoryRepoImpl: CategoryRepository
) => {

    const dbRepositoryProduct = productRepositoryInterface(productRepoImpl())
    const dbRepositoryCategory = categoryRepositoryInterface(categoryRepoImpl())

    const addProduct = expressAsyncHandler(async (req: Request, res: Response) => {
        const product: IProduct = req.body
        await addProductUseCase(product, dbRepositoryProduct)
        res.status(HttpStatusCodes.CREATED).json({
            status: 'success',
            message: 'Successfully added new product',
            data: null
        })
    })

    const findProductsByCategory = expressAsyncHandler(async (req: Request, res: Response) => {
        const categoryId = req.query.categoryId as string
        const response = await findProductsByCategoryUseCase(categoryId,dbRepositoryCategory,dbRepositoryProduct)
        res.status(HttpStatusCodes.CREATED).json({
            status: 'success',
            message: 'Successfully retrieved products by category',
            data: response
        })
    })

    return {
        addProduct,
        findProductsByCategory
    }

}

export default productController