import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  order_price: number;

  @Prop()
  order_status: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
