import HttpStatusCodes from "../../constants/http-status-codes";
import Product from "../../entities/product";
import { IProduct } from "../../types/product";
import AppError from "../../utils/app-error";
import CategoryRepositoryInterface from "../repositories/category-repo-interface";
import ProductRepositoryInterface from "../repositories/product-repo-interface";

export const addProductUseCase = async (product: IProduct, repository: ReturnType<ProductRepositoryInterface>) => {
    const newProduct = new Product(product)
    await repository.addProduct(newProduct)
}

export const findProductsByCategoryUseCase = async (categoryId: string, categoryRepository: ReturnType<CategoryRepositoryInterface>, productRepository: ReturnType<ProductRepositoryInterface>) => {
    if (!categoryId) {
        throw new AppError("Please provide a valid category id", HttpStatusCodes.BAD_REQUEST)
    }
    const categoryExists = await categoryRepository.findCategoryById(categoryId)
    if (!categoryExists?.length) {
        throw new AppError("Category not found, please provide a valid category id", HttpStatusCodes.BAD_REQUEST)
    }
    const result = await productRepository.findProductsByCategory(categoryId)
    return result
}