import Tables from "../../../constants/table-names";
import Product from "../../../entities/product";
import dynamoClient from "./config";


export const productRepository = () => {

    const addProduct = async (product: Product) => {
        const params = {
            TableName: Tables.product,
            Item: product.marshal(),
        };
        await dynamoClient.putItem(params)
    }

    const findProductsByCategory = async (categoryId: string) => {
        const productParams = {
            TableName: Tables.product,
            IndexName: 'CategoryIdIndex',
            KeyConditionExpression: 'categoryId = :categoryId',
            ExpressionAttributeValues: {
                ':categoryId': { S: categoryId },
            },
        };
        const categoryParams = {
            TableName: Tables.category,
            IndexName: 'CategoryIdIndex',
            KeyConditionExpression: '#attr = :value',
            ExpressionAttributeNames: {
                '#attr': 'categoryId',
            },
            ExpressionAttributeValues: {
                ':value': { S: categoryId },
            },
        };

        const [productResult, categoryResult] = await Promise.all([
            dynamoClient.query(productParams),
            dynamoClient.query(categoryParams),
        ]);

        const products = productResult.Items;
        const totalProducts = productResult.Count
        const category = categoryResult.Items;

        return {
            categoryId: category && category[0]?.categoryId,
            categoryName: category && category[0]?.categoryName,
            totalProducts: totalProducts,
            products: products
        }
    };

    return {
        addProduct,
        findProductsByCategory
    }
}

type ProductRepository = typeof productRepository
export default ProductRepository