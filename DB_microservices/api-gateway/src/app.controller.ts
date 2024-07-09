import { Body, Controller, Get, Post } from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";

@Controller()
export class AppController {
  private client1: ClientProxy;
  private client2: ClientProxy;

  constructor() {
    this.client1 = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: "127.0.0.1", port: 8877 },
    });

    this.client2 = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: "127.0.0.1", port: 8878 },
    });
  }

  @Get("/users")
  callGetUser() {
    return this.client1.send({ cmd: "get_user" }, {});
  }

  @Post("/create-user")
  callCreateUser(
    @Body()
    createUserDto: {
      username: string;
      email: string;
      password: string;
    }
  ) {
    return this.client1.send({ cmd: "create_user" }, createUserDto);
  }

  @Get("/get-order")
  callGetOrder() {
    return this.client2.send({ cmd: "get_order" }, {});
  }
  
  @Post("/create-order")
  callCreateOrder(
    @Body()
    createProductDto: {
      product_name: string;
      product_price: number;
    }
  ) {
    return this.client2.send({ cmd: "create_order" }, createProductDto);
  }
}
