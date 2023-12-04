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

    const findProductsByCategory = async (categoryId: string) => {
        const productParams = {
            TableName: Tables.product,
            IndexName: 'CategoryIdIndex',
            KeyConditionExpression: 'categoryId = :categoryId',
            ExpressionAttributeValues: {
                ':categoryId': { S: categoryId },
              },
        };

        const result = await dynamoClient.query(productParams)
        console.log(result)
        // console.log(attr.unwrap(result.Items))

        const categoryParams = {
            TableName: Tables.category,
            Key: attr.wrap({ categoryId: categoryId }),
        };
        
        const category = await dynamoClient.getItem(categoryParams)
        console.log(category)

        try {

            // const [productResult, categoryResult] = await Promise.all([
            //     dynamoClient.query(productParams).promise(),
            //     dynamoClient.get(categoryParams).promise(),
            // ]);

            // const products = productResult.Items;
            // const category = categoryResult.Item;

            // console.log('Products:', products);
            // console.log('Category:', category);
        } catch (error) {
            console.error('Error', error);
            throw error;
        }
    };


    return {
        addProduct,
        findProductsByCategory
    }
}

type ProductRepository = typeof productRepository
export default ProductRepository