import Category from "../../entities/category";
import CategoryRepository from "../../frameworks/databases/dynamodb/category-repo";
export const categoryRepositoryInterface = (repository: ReturnType<CategoryRepository>) => {

    const addCategory = (category: Category) => repository.addCategory(category)

    const findCategoryByName = (categoryName: string) => repository.findCategoryByName(categoryName)

    const findAll = (limit: number, skip: number) => repository.findAll(limit, skip)

    const findCategoryById = (categoryId:string)=> repository.findCategoryById(categoryId)

    return {
        addCategory,
        findCategoryByName,
        findAll,
        findCategoryById
    }
}

type CategoryRepositoryInterface = typeof categoryRepositoryInterface
export default CategoryRepositoryInterface