import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'place_order' })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @MessagePattern({ cmd: 'get_order' })
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }
}
