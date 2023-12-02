import { DynamoDB } from '@aws-sdk/client-dynamodb';

const connectDynamoDB = async () => {
  try {
    const config = {
      region: 'localhost',
      endpoint: 'http://localhost:8000',
      accessKeyId: 'test',
      secretAccessKey: 'test', 
    }
    const client = new DynamoDB(config);
    client.listTables({}, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });

    console.log(`Connected to DynamoDB Local successfully`.bgGreen.bold);
  } catch (error) {
    console.error(`Error connecting to DynamoDB Local: ${error}`);
    process.exit(1);
  }
};

export default connectDynamoDB;
