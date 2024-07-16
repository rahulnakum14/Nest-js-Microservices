import { Injectable } from '@nestjs/common';
import { Order } from 'src/schema/order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { orderDto } from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async getOrder(): Promise<orderDto[]> {
    return await this.orderModel.find({});
  }

  async createOrder(order_id: string, order_price: number): Promise<orderDto> {
    const newOrder = await this.orderModel.create({
      order_id: order_id,
      order_price: order_price,
    });
    await newOrder.save();
    return newOrder;
  }
}
