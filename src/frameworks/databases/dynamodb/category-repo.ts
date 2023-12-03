import Tables from "../../../constants/table-names"
import Category from "../../../entities/category"
import dynamoClient from "./config"

export const categoryRepository = () => {


    const addCategory = async (category: Category) => {

        const params = {
            TableName: Tables.category,
            Item: category,
        };
        await dynamoClient.put(params).promise()

    }

    const findCategoryByName = async (categoryName: string) => {
        const params = {
            TableName: Tables.category,
            IndexName: "NameIndex",
            KeyConditionExpression: "#name = :name",
            ExpressionAttributeNames: {
                "#name": "categoryName",
            },
            ExpressionAttributeValues: {
                ":name": { S: categoryName },
            },
        };

        const result = await dynamoClient.query(params).promise()
        return result.Items;
    };


    const findAll = async (limit: number, skip: number) => {
        let params = {
            TableName: Tables.category,
            Limit: limit,
            // ExclusiveStartKey:{
            //     categoryId:skip
            // }
        };
        const result = await dynamoClient.scan(params).promise()
        return {
            totalCategories: result.Count,
            categories: result.Items
        }
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
