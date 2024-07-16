import { Body, Controller, Get, Post } from '@nestjs/common';
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
      order_id: string;
      order_price: number;
    },
  ) {
    return this.client_order.send({ cmd: 'create_order' }, createOrderDto);
  }

  // @Post("/create-user")
  // callCreateUser(
  //   @Body()
  //   createUserDto: {
  //     username: string;
  //     email: string;
  //     password: string;
  //   }
  // ) {
  //   return this.client1.send({ cmd: "create_user" }, createUserDto);
  // }

  @Get('/orderStatus')
  callOrderStatus() {
    return this.client_order.send({ cmd: 'order_status' }, {});
  }

  @Post('/create-product')
  callCreateProduct() {
    return this.client_inventory.send({ cmd: 'create_product' }, {});
  }

  @Get('/update-stock')
  callUpdateStock() {
    return this.client_inventory.send({ cmd: 'update_stock' }, {});
  }
}
