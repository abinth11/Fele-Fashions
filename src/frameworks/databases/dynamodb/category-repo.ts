import Tables from "../../../constants/table-names"
import Category from "../../../entities/category"
import dynamoClient from "./config"

export const categoryRepository = () => {


    const addCategory = async (category: Category) => {

        const params = {
            TableName: Tables.category,
            Item: category.marshal(),
        };
        await dynamoClient.putItem(params)

    }

    const findCategoryByName = async (categoryName: string) => {
        const params = {
            TableName: Tables.category,
            IndexName: 'NameIndex',
            KeyConditionExpression: '#attr = :value',
            ExpressionAttributeNames: {
                '#attr': 'categoryName',
            },
            ExpressionAttributeValues: {
                ':value': { S: categoryName },
            },
        };

        const result = await dynamoClient.query(params)
        return result.Items
    };



    const findAll = async (limit: number, skip: number) => {
        let params = {
            TableName: Tables.category,
            Limit: limit,
            // ExclusiveStartKey:{
            //     categoryId:skip
            // }
        };
        const result = await dynamoClient.scan(params)
        return {
            totalCategories: result.Count,
            categories: result.Items
        }
    }

    return {
        addCategory,
        findCategoryByName,
        findAll
    }
}

type CategoryRepository = typeof categoryRepository
export default CategoryRepository
