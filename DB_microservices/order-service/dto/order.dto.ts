import { IsNotEmpty } from 'class-validator';

export class orderDto {
  @IsNotEmpty({ message: 'Username is required' })
  product_name: string;

  @IsNotEmpty({ message: 'Email is required' })
  product_price: number;
}
