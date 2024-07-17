import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Inventory>;

@Schema()
export class Inventory {
  @Prop()
  product_name: string;

  @Prop()
  product_price: number;

  @Prop()
  product_stock: number;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
