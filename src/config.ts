import dotenv from 'dotenv';
import path from 'path';
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.join(__dirname, `..`, `.env.${env}`) });

const ENV_CONFIG = {

  PORT: process.env.PORT as string,

  NODE_ENV: process.env.NODE_ENV as string,

  REDIS_URL: process.env.REDIS_URL as string, 

  API_KEY: process.env.API_KEY as string,

  AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION as string,

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID as string,

  AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY as string,

  AWS_END_POINT:process.env.AWS_END_POINT as string

};

export default ENV_CONFIG;