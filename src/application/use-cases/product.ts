import HttpStatusCodes from "../../constants/http-status-codes";
import Product from "../../entities/product";
import { IProduct } from "../../types/product";
import AppError from "../../utils/app-error";
import ProductRepositoryInterface from "../repositories/product-repo-interface";

export const addProductUseCase = async (product: IProduct, repository: ReturnType<ProductRepositoryInterface>) => {
    const newProduct = new Product(product)
    await repository.addProduct(newProduct)
}

export const findProductsByCategoryUseCase = async (categoryId: string, repository: ReturnType<ProductRepositoryInterface>)=>{
    if (!categoryId) {
        throw new AppError("Please provide a valid category id", HttpStatusCodes.BAD_REQUEST)
    }
    const result = await repository.findProductsByCategory(categoryId)
    return result
}