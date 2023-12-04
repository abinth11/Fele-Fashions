import CacheKeys from "../../constants/cache-keys";
import HttpStatusCodes from "../../constants/http-status-codes";
import Product from "../../entities/product";
import { IProduct } from "../../types/product";
import AppError from "../../utils/app-error";
import { validateLimitAndSkip } from "../../utils/helper-function";
import CacheRepositoryInterface from "../repositories/cache-repo-interface";
import CategoryRepositoryInterface from "../repositories/category-repo-interface";
import ProductRepositoryInterface from "../repositories/product-repo-interface";

/**
 * Add a new product
 * @param product - The product data to be added.
 * @param repository - The repository for interacting with DynamoDB.
 * @param cacheRepository - The repository for the cache db
 * @returns {Promise<void>} - Resolves when the product is successfully added.
 * @throws {AppError} - Throws an error if there's an issue adding the product.
 */
export const addProductUseCase = async (
    product: IProduct,
    repository: ReturnType<ProductRepositoryInterface>,
    cacheRepository: ReturnType<CacheRepositoryInterface>
): Promise<void> => {
    const newProduct = new Product(product)
    await repository.addProduct(newProduct)
    await cacheRepository.clearAllPreviousCache(CacheKeys.PRODUCTS_BY_CATEGORY)
}

/**
 * Find products by category
 * @param categoryId - The category ID to search for products.
 * @param limit - The maximum number of categories to retrieve.
 * @param skip - The number of categories to skip.
 * @param categoryRepository - The repository for interacting with the category table.
 * @param productRepository - The repository for interacting with the product table.
 * @param cacheRepository - The repository for the cache db
 * @returns {Promise<any>} - Resolves with the products found for the given category.
 * @throws {AppError} - Throws an error if there's an issue during the operation.
 */
export const findProductsByCategoryUseCase = async (
    categoryId: string,
    limit: number,
    skip: number,
    categoryRepository: ReturnType<CategoryRepositoryInterface>,
    productRepository: ReturnType<ProductRepositoryInterface>,
    cacheRepository: ReturnType<CacheRepositoryInterface>
): Promise<any> => {
    if (!categoryId) {
        throw new AppError("Please provide a valid category id", HttpStatusCodes.BAD_REQUEST)
    }
    if (!validateLimitAndSkip(limit, skip)) {
        throw new AppError("Please provide a valid limit and skip values", HttpStatusCodes.BAD_REQUEST)
    }
    const categoryExists = await categoryRepository.findCategoryById(categoryId)
    if (!categoryExists?.length) {
        throw new AppError("Category not found, please provide a valid category id, limit must be less than 100", HttpStatusCodes.BAD_REQUEST)
    }
    const result = await productRepository.findProductsByCategory(categoryId,limit,skip)
    const cacheOptions = {
        key: `${CacheKeys.ALL_CATEGORIES}:${limit}:${skip}`,
        data: JSON.stringify(result),
        expireTimeSec: 86400
    }
    result && await cacheRepository.setCache(cacheOptions)
    return result
}