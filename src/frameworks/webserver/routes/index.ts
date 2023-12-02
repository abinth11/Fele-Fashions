import { Application } from 'express';
import { RedisClient } from '../../../app';
import categoryRouter from './category';

const routes = (app: Application, redisClient: RedisClient) => {

    app.use('api/v1/categories', categoryRouter())


};

export default routes;