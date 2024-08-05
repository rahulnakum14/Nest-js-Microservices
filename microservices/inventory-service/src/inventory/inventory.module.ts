import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { ProductSchema } from '../schemas/product.schema';
import { KafkaModule } from 'kafka/kafka.module'; // Using custom path

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    KafkaModule
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
