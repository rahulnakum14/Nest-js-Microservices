import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from '../schemas/order.schema';
import { KafkaModule } from "../../../kafka/kafka.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    KafkaModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
