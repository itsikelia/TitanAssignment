import { inject, injectable } from 'inversify';
import mysql, { Connection } from 'mysql2';
import IOrderService from '../interfaces/IOrderService';
import { OrderModel } from '../models/OrderModel';
import TYPES from '../types';

@injectable()
export default class OrderService implements IOrderService {
    private readonly ordersDb: mysql.Connection;

    constructor(@inject(TYPES.OrdersDb) ordersDb: mysql.Connection) {
      this.ordersDb = ordersDb;
    }
    async addOrder(order: OrderModel): Promise<void> {
        const query = `CALL titan.CreateOrder(?, ?, ?, ?, ?, ?, @p_order_id);`;
        const values = [
            order.email,
            order.fullName,
            order.fullAddress,
            JSON.stringify(order.imageUrls), 
            order.frameColor,
            order.user
        ];

        // Execute the stored procedure
        this.ordersDb.query(query, values, (err, results) => {
            if (err) {
                console.error('Error executing stored procedure:', err);
            }

        })
    }

    async getOrdersByUser(user: string): Promise<{ orders: OrderModel[] }> {
        const query = `CALL titan.GetUserOrders(?)`;
    
        return new Promise((resolve, reject) => {
            this.ordersDb.query(query, [user], (err, results:[any]) => {
                if (err) {
                    console.error('Error executing stored procedure:', err);
                    return reject(err); // Reject the promise on error
                }
                // Parse the result to match the OrderModel structure
                const orders: OrderModel[] = results[0].map((row: any) => ({
                    email: row.email,
                    fullName: row.full_name,
                    fullAddress: row.full_address,
                    imageUrls: row.image_urls, 
                    frameColor: row.frame_color,
                    user: row.user
                }));
    
                resolve({ orders }); // Resolve the promise with the parsed orders
            });
        });
    }
    
}
