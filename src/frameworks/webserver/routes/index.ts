import { Application } from 'express';
import { RedisClient } from '../../../app';
import categoryRouter from './category';
import { verifyApiKey } from '../middlewares/verify-api-key';

const routes = (app: Application, redisClient: RedisClient) => {

    app.use('/api/v1/categories', categoryRouter())

};

export default routes;