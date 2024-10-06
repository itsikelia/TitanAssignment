import { OrderModel } from "../models/OrderModel";

interface IOrderService {
    addOrder(order: OrderModel): Promise<void>;
    getOrdersByUser(user: string) : Promise<{ orders: OrderModel[] }>
}

export default IOrderService;
