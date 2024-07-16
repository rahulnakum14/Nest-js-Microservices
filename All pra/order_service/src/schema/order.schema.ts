import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  order_id: string;

  @Prop()
  order_price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
