import { IsNotEmpty } from 'class-validator';

export class orderDto {
  @IsNotEmpty({ message: 'Product Id is required' })
  product_id: string;

  @IsNotEmpty({ message: 'Order Price is required' })
  order_price: number;

  @IsNotEmpty({ message: 'Order Status is required' })
  order_status: boolean;
}
