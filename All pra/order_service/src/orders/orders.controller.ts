import { Controller } from '@nestjs/common';
import { OrderService } from './orders.service';
import { orderDto } from '../dto/order.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'order_status' })
  async getUser(
    @Payload() id: string,
  ): Promise<orderDto[] | { message: string }> {
    return await this.orderService.getOrder(id);
  }

  @MessagePattern({ cmd: 'create_order' })
  async createOrder(data: orderDto): Promise<string | orderDto> {
    // Consume the event which is published

    const { product_id, order_price, order_status } = data;
    console.log(`this is order_id and order_price ${order_price}`);
    const newOrder = await this.orderService.createOrder(
      product_id,
      order_price,
      order_status,
    );
    return newOrder;
  }
}
