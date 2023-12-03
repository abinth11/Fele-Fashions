import AWS from 'aws-sdk';
import ENV_CONFIG from '../../../config';

AWS.config.update({
    region: ENV_CONFIG.AWS_DEFAULT_REGION,
    accessKeyId: ENV_CONFIG.AWS_ACCESS_KEY_ID,
    secretAccessKey: ENV_CONFIG.AWS_SECRET_ACCESS_KEY,
    // @ts-ignore
    endpoint:ENV_CONFIG.AWS_END_POINT ,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
export default dynamoClient;
