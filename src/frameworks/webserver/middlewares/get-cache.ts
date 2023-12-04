import { NextFunction, Request, Response } from 'express';
import { RedisClient } from '../../../app';

export function getCacheMiddleware(key: string, redisClient: RedisClient) {
    return async function (
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const data = await redisClient.get(`${key}:${req.query.limit}:${req.query.skip}`);
        if (!data) {
            return next();
        } else {
            res.json({ data: JSON.parse(data) });
        }
    };
}