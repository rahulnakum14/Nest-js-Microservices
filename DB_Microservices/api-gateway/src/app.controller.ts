import { Body, Controller, Post } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  private client1: ClientProxy;

  constructor() {
    this.client1 = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 8877 },
    });
  }

  @Post('/create-user')
  callCreateUser(
    @Body()
    createUserDto: {
      username: string;
      email: string;
      password: string;
    },
  ) {
    return this.client1.send({ cmd: 'create_user' }, createUserDto);
  }
}
