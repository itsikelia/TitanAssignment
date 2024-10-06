import { interfaces, controller, httpGet, requestParam, BaseHttpController, TYPE } from 'inversify-express-utils';
import { Request, Response, json, response } from 'express';
import { JsonResult } from 'inversify-express-utils/lib/results';
import IImageService from '../interfaces/IImageService';
import TYPES from '../types';
import { inject } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';


@controller('/image')
export class ImageController extends BaseHttpController {
    private readonly imageService: IImageService;

    constructor(@inject(TYPES.ImageService) imageService: IImageService) {
        super();
        this.imageService = imageService
    }

    @httpGet('/:inputNumber')
    public async getImages(@requestParam('inputNumber') inputNumber: number,): Promise<JsonResult> {
        // Define the validation schema
        const schema = Joi.number().greater(3).required();

        // Validate the input
        const { error } = schema.validate(inputNumber);

        if (error) {
            // Return a validation error response
            return this.json({ message: error.details[0].message }, StatusCodes.BAD_REQUEST);
        }
        const res = await this.imageService.getImageUrls(inputNumber);
        return this.json(res.urls, StatusCodes.OK);
    }
}

export default ImageController;
