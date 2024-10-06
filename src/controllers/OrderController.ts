import { controller, BaseHttpController, httpPost, requestBody, httpGet, requestParam } from 'inversify-express-utils';
import { JsonResult } from 'inversify-express-utils/lib/results';
import TYPES from '../types';
import { inject } from 'inversify';
import { OrderModel } from '../models/OrderModel';
import IOrderService from '../interfaces/IOrderService';
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi';

@controller('/order')
export class OrderController extends BaseHttpController {
    private readonly orderService: IOrderService;

    constructor(@inject(TYPES.OrderService) orderService: IOrderService) {
        super();
        this.orderService = orderService
    }

    @httpPost('/')
    public async addOrder(@requestBody() order: OrderModel): Promise<JsonResult> {
        // Define the validation schema
        const schema = Joi.object({
            email: Joi.string().email().required(),
            fullName: Joi.string().min(1).required(),
            fullAddress: Joi.string().min(1).required(),
            imageUrls: Joi.array().items(Joi.string().uri()).required(),
            frameColor: Joi.string().required(), // Example of frame colors
            user: Joi.string().min(1).required(),
        });

        // Validate the order
        const { error } = schema.validate(order);

        if (error) {
            // Return a validation error response
            return this.json({ message: error.details[0].message }, StatusCodes.BAD_REQUEST);
        }

        await this.orderService.addOrder(order);
        return this.json('OK', StatusCodes.CREATED);
    }

    @httpGet('/:user')
    public async getOrders(@requestParam('user') user: string,): Promise<JsonResult> {
        const res = await this.orderService.getOrdersByUser(user);
        return this.json(res.orders);
    }

}

export default OrderController;
