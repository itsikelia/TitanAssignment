import 'reflect-metadata';
import { Container } from 'inversify';
import './controllers/ImageController';
import './controllers/OrderController'
import IImageService from './interfaces/IImageService';
import TYPES from './types';
import PixabayService from './services/PixabayService';
import IOrderService from './interfaces/IOrderService';
import OrderService from './services/OrderService';
import NodeCache from 'node-cache';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
const container = new Container();
container.bind<NodeCache>(TYPES.NodeCache).toConstantValue(new NodeCache({ stdTTL: 60 }));
container.bind<mysql.Connection>(TYPES.OrdersDb).toConstantValue(mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) 
})) 

container.bind<IImageService>(TYPES.ImageService)
  .to(PixabayService).inRequestScope();

container.bind<IOrderService>(TYPES.OrderService)
  .to(OrderService).inRequestScope();



export default container;
