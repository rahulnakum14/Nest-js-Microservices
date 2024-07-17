import { IsNotEmpty } from 'class-validator';

export class orderDto {
  @IsNotEmpty({ message: 'Order Price is required' })
  order_price: number;

  @IsNotEmpty({ message: 'Order Status is required' })
  order_status: boolean;
}
