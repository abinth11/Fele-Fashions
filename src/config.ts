import dotenv from 'dotenv';
import path from 'path';
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.join(__dirname, `..`, `.env.${env}`) });

const ENV_CONFIG = {

  PORT: process.env.PORT as string,

  NODE_ENV: process.env.NODE_ENV as string,

  JWT_SECRET: process.env.JWT_SECRET as string,

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,

  REDIS_URL: process.env.REDIS_URL as string, 

  API_KEY: process.env.API_KEY as string,

  AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,

  AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY,

  AWS_END_POINT:process.env.AWS_END_POINT

};

export default ENV_CONFIG;