import { Request, Response, NextFunction } from "express";
import ENV_CONFIG from "../../../config";
import AppError from "../../../utils/app-error";
import HttpStatusCodes from "../../../constants/http-status-codes";

export const verifyApiKey = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key']
    if (!apiKey) {
        throw new AppError('Unauthorized user, an api key must be provided', HttpStatusCodes.UNAUTHORIZED)
    } else if (apiKey === ENV_CONFIG.API_KEY) {
        next()
    } else {
        throw new AppError('Invalid api key , please provide a valid api key', HttpStatusCodes.UNAUTHORIZED)
    }
}