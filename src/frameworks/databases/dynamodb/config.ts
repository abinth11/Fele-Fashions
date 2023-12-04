import { DynamoDB } from "@aws-sdk/client-dynamodb";
import ENV_CONFIG from '../../../config';

const config = {
    region: ENV_CONFIG.AWS_DEFAULT_REGION,
    accessKeyId: ENV_CONFIG.AWS_ACCESS_KEY_ID,
    secretAccessKey: ENV_CONFIG.AWS_SECRET_ACCESS_KEY,
    // @ts-ignore
    endpoint:ENV_CONFIG.AWS_END_POINT ,
}
// export const dynamoDB = new AWS.DynamoDB();
// const dynamoClient = new AWS.DynamoDB.DocumentClient();
const dynamoClient = new DynamoDB(config);

export default dynamoClient;
