import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rahuln:HTV5MiJqrFO5ytZh@cluster0.zwjsixq.mongodb.net/test',
    ),
    OrderModule,
  ],
})
export class AppModule {}
