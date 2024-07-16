import { Controller } from '@nestjs/common';
import { OrderService } from './orders.service';
import { orderDto } from '../dto/order.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'order_status' })
  async getUser(): Promise<orderDto[]> {
    return await this.orderService.getOrder();
  }

  @MessagePattern({ cmd: 'create_order' })
  async createOrder(data: orderDto): Promise<string> {
    const { order_id, order_price } = data;
    console.log(`this is order_id ${order_id} and order_price ${order_price}`);
    const newOrder = await this.orderService.createOrder(order_id, order_price);
    return `Order is created with the price: ${newOrder.order_price}`;
  }
}
