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

  async getOrder(id: string): Promise<orderDto[] | { message: string }> {
    const result = await this.orderModel.find({ _id: id }).exec();
    if (!result || result.length === 0) {
      return { message: 'Order Not Found' };
    }
    return result;
  }

  async createOrder(
    product_id: string,
    order_price: number,
    order_status: boolean,
  ): Promise<orderDto> {
    const newOrder = await this.orderModel.create({
      product_id: product_id,
      order_price: order_price,
      order_status: order_status,
    });
    await newOrder.save();
    return newOrder;
  }
}
