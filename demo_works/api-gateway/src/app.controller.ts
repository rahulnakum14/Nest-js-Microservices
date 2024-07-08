import { Controller, Get } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  private client1: ClientProxy;
  private client2: ClientProxy;

  constructor() {
    this.client1 = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 8877 },
    });

    this.client2 = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 8878 },
    });
  }

  @Get('microservice1')
  callMicroservice1() {
    return this.client1.send({ cmd: 'get_data' }, {});
  }

  @Get('microservice2')
  callMicroservice2() {
    return this.client2.send({ cmd: 'get_info' }, {});
  }
}
