import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error has occurred' });
    next();
};

export default errorHandler;
