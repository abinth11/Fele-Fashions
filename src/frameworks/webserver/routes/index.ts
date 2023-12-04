import { Application } from 'express';
import { RedisClient } from '../../../app';
import categoryRouter from './category';
import { verifyApiKey } from '../middlewares/verify-api-key';
import productRouter from './product';

/**
 * Set up routes for the Express application.
 * @param {object} app - The Express application object.
 * @param {object} redisClient - The Redis client instance.
 * @returns {void}
 */
const routes = (app: Application, redisClient: RedisClient): void => {

    app.use('/api/v1/categories', verifyApiKey, categoryRouter(redisClient))
    app.use('/api/v1/products', verifyApiKey, productRouter(redisClient))

};

export default routes;