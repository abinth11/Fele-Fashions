import Tables from "../../../constants/table-names";
import Product from "../../../entities/product";
import dynamoClient from "./config";
const attr = require('dynamodb-data-types').AttributeValue;


export const productRepository = () => {

    const addProduct = async (product: Product) => {
        const params = {
            TableName: Tables.product,
            Item: product.marshal(),
        };
        await dynamoClient.putItem(params)
    }

    const findProductsByCategory = async (categoryId: string,limit:number,skip:number) => {
        const productParams = {
            TableName: Tables.product,
            IndexName: 'CategoryIdIndex',
            Limit: limit,
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

        const products = productResult.Items && productResult.Items.map((item) => attr.unwrap(item))
        const totalProducts = productResult.Count
        const category = categoryResult.Items && attr.unwrap(categoryResult?.Items[0])

        return {
            categoryId: category?.categoryId,
            categoryName: category?.categoryName,
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