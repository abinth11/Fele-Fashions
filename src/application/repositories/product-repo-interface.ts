import Product from "../../entities/product";
import ProductRepository from "../../frameworks/databases/dynamodb/product-repo";

export const productRepoInterface = (repository:ReturnType<ProductRepository>)=>{

    const addProduct = (product:Product)=> repository.addProduct(product)

    const findProductsByCategory = (categoryId:string) => repository.findProductsByCategory(categoryId)

    return {
        addProduct,
        findProductsByCategory
    }
}

type ProductRepositoryInterface = typeof productRepoInterface
export default ProductRepositoryInterface