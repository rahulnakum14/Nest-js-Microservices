import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { inventoryService } from './inventory.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory, InventorySchema } from '../schema/inventory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inventory.name, schema: InventorySchema },
    ]),
  ],
  controllers: [InventoryController],
  providers: [inventoryService],
})
export class InventoryModule {}
