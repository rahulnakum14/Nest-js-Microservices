import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { orderDto } from 'dto/order.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'get_order' })
  async getUser(): Promise<orderDto[]> {
    return await this.orderService.getOrder();
  }

  @MessagePattern({ cmd: 'create_order' })
  async createUser(data: orderDto): Promise<string> {
    const { product_name, product_price } = data;

    const newOrder = await this.orderService.createOrder(
      product_name,
      product_price,
    );
    return `Created user with username: ${newOrder.product_name}`;
  }
}
