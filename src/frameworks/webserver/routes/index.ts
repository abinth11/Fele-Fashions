import { Application } from 'express';
import { RedisClient } from '../../../app';
import categoryRouter from './category';
import { verifyApiKey } from '../middlewares/verify-api-key';
import productRouter from './product';

const routes = (app: Application, redisClient: RedisClient) => {

    app.use('/api/v1/categories', verifyApiKey, categoryRouter())
    app.use('/api/v1/products', verifyApiKey, productRouter())

};

export default routes;