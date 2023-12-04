import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import HttpStatusCodes from "../../../constants/http-status-codes";

export const catchValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const validationErrors = errors.array();

        const formattedErrors = validationErrors.map((error: any) => ({
            field: error.path, 
            message: error.msg,
        }));

        res.status(HttpStatusCodes.BAD_REQUEST).json({
            status: 'error',
            message: 'Invalid user input',
            errors: formattedErrors,
        });
    } else {
        next();
    }
};
