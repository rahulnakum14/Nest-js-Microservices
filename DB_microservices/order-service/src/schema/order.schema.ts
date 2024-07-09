import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  product_name: string;

  @Prop()
  product_price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
