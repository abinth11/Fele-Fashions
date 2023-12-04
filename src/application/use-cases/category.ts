import CacheKeys from "../../constants/cache-keys";
import HttpStatusCodes from "../../constants/http-status-codes";
import Category from "../../entities/category";
import { ICategory } from "../../types/category";
import AppError from "../../utils/app-error";
import { validateLimitAndSkip } from "../../utils/helper-function";
import CacheRepositoryInterface from "../repositories/cache-repo-interface";
import CategoryRepositoryInterface from "../repositories/category-repo-interface";


/**
 * Add a new category to Db
 * @param category - The category object to add.
 * @param repository - The repository for interacting with DynamoDB.
 * @param cacheRepository - The repository for the cache db
 * @returns {Promise<void>} - Resolves when the category is added successfully.
 * @throws {AppError} - Throws an error if the category already exists.
 */
export const addCategoryUseCase = async (
    category: ICategory,
    repository: ReturnType<CategoryRepositoryInterface>,
    cacheRepository: ReturnType<CacheRepositoryInterface>
): Promise<void> => {

    const alreadyExists = await repository.findCategoryByName(category.categoryName)
    if (alreadyExists?.length) {
        throw new AppError("Category with same name already exists", HttpStatusCodes.CONFLICT)
    }
    const newCategory = new Category(category)
    await repository.addCategory(newCategory)
    await cacheRepository.clearAllPreviousCache(CacheKeys.ALL_CATEGORIES)
}

/**
 * Retrieve all categories from DynamoDB
 * @param limit - The maximum number of categories to retrieve.
 * @param skip - The number of categories to skip.
 * @param repository - The repository for interacting with db.
 * @param cacheRepository - The repository for the cache db
 * @returns {Promise<any>} - Resolves with the list of categories.
 * @throws {AppError} - Throws an error if the provided limit or skip values are invalid.
 */
export const findAllCategoriesUseCase = async (
    limit: number,
    skip: number,
    repository: ReturnType<CategoryRepositoryInterface>,
    cacheRepository: ReturnType<CacheRepositoryInterface>
): Promise<any> => {
    if (!validateLimitAndSkip(limit, skip)) {
        throw new AppError("Please provide a valid limit and skip values, limit must be less than 100", HttpStatusCodes.BAD_REQUEST)
    }
    const categories = await repository.findAll(limit, skip)
    const cacheOptions = {
        key: `${CacheKeys.ALL_CATEGORIES}:${limit}:${skip}`,
        data: JSON.stringify(categories),
        expireTimeSec: 86400
    }
    categories && await cacheRepository.setCache(cacheOptions)
    return categories

}
