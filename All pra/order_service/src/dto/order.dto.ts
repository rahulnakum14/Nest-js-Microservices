import { IsNotEmpty } from 'class-validator';

export class orderDto {
  @IsNotEmpty({ message: 'Order Id is required' })
  order_id: string;

  @IsNotEmpty({ message: 'Order Price is required' })
  order_price: number;
}
