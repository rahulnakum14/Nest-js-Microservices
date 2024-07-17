import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  private client_order: ClientProxy;
  private client_inventory: ClientProxy;

  constructor() {
    this.client_order = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877,
      },
    });

    this.client_inventory = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8878,
      },
    });
  }

  @Post('/create-order')
  callCreateOrder(
    @Body()
    createOrderDto: {
      order_price: number;
      order_status: boolean;
    },
  ) {
    return this.client_order.send({ cmd: 'create_order' }, createOrderDto);
  }

  @Get('/orderStatus/:id')
  callOrderStatus(@Param('id') id: string) {
    return this.client_order.send({ cmd: 'order_status' }, id);
  }

  @Post('/create-product')
  callCreateProduct(
    @Body()
    createProductDto:{
      product_name: string;
      product_price: string;
    }
  ) {
    return this.client_inventory.send({ cmd: 'create_product' }, createProductDto);
  }

  @Patch('/update-stock/:id')
  callUpdateStock(
    @Param('id') id: string,
    @Body() body: { product_stock: number },
  ) {
    return this.client_inventory.send({ cmd: 'update_stock' }, { id, data: body });
  }
}
