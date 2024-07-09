import { Injectable } from '@nestjs/common';
import { Order } from 'src/schema/order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { orderDto } from 'dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async getOrder(): Promise<orderDto[]> {
    return await this.orderModel.find({});
  }

  async createOrder(
    product_name: string,
    product_price: number,
  ): Promise<orderDto> {
    const newOrder = await this.orderModel.create({
      product_name: product_name,
      product_price: product_price,
    });
    await newOrder.save();
    return newOrder;
  }
}
