import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Controller()
export class AppController {
  private client_order: ClientProxy;
  private client_inventory: ClientProxy;

  constructor() {
    this.client_order = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3002,
      },
    });

    this.client_inventory = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      },
    });
  }

  //Inventory Functions

  @Post('/inventory')
  async createProduct(@Body() createProductDto: {
    name: string;
    price: number;
    stock: string;
  }) {
    return this.client_inventory.send({ cmd: 'create_product' }, createProductDto);
  }

  @Put('/inventory/:id')
  async updateStock(@Param('id') id: string, @Body() body: any) {
    return this.client_inventory.send({ cmd: 'update_stock' }, body);
  }

  // Order Functions

  @Post('/orders')
  async createOrder(@Body() createOrderDto: {
    productId: string;
    quantity: number;
    status: string;
  }) {
    return this.client_order.send({ cmd: 'place_order' }, createOrderDto);
  }

  @Get('/orders/:id')
  async getOrder(@Param('id') id: string) {
    return this.client_order.send({ cmd: 'get_order' }, id);
  }
}
