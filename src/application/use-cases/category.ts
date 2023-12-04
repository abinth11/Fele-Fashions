import HttpStatusCodes from "../../constants/http-status-codes";
import Category from "../../entities/category";
import { ICategory } from "../../types/category";
import AppError from "../../utils/app-error";
import CategoryRepositoryInterface from "../repositories/category-repo-interface";

export const addCategoryUseCase = async (category: ICategory, repository: ReturnType<CategoryRepositoryInterface>) => {

    const alreadyExists = await repository.findCategoryByName(category.categoryName)
    if (alreadyExists?.length) {
        throw new AppError("Category with same name already exists", HttpStatusCodes.CONFLICT)
    }
    const newCategory = new Category(category)
    await repository.addCategory(newCategory)
}

export const findAllCategoriesUseCase = async (limit: number, skip: number, repository: ReturnType<CategoryRepositoryInterface>) => {

    const categories = await repository.findAll(limit, skip)
    return categories

}
