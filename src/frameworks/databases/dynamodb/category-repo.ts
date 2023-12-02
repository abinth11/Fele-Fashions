import dynamodbConfig from "./connection"
import Tables from "../../../constants/table-names"
import Category from "../../../entities/category"

export const categoryRepository = () => {

    const dynamodb = dynamodbConfig()

    const addCategory = async (category: Category) => {
        const params = {
            TableName: Tables.category,
            Item: category.toDynamoDBItem(),
        };
        await dynamodb.client.putItem(params)
    }

    const findCategoryByName = async (categoryName: string) => {
        const params = {
            TableName: Tables.category,
            IndexName: "NameIndex",
            KeyConditionExpression: "#name = :name",
            ExpressionAttributeNames: {
                "#name": "name",
            },
            ExpressionAttributeValues: {
                ":name": { S: categoryName }
            },
        };

        const result = await dynamodb.client.query(params);
        return result
    };

    const findAll = async (limit: number, skip: number) => {
        let params = {
            TableName: Tables.category,
        };
        const result = await dynamodb.client.scan(params)
        return result
    }

    const findProductsByCategory = async () => {

    }

    return {
        addCategory,
        findCategoryByName,
        findAll,
        findProductsByCategory
    }
}

type CategoryRepository = typeof categoryRepository
export default CategoryRepository