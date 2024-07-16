import { IsNotEmpty } from 'class-validator';

export class inventoryDto {
  @IsNotEmpty({ message: 'product name is required' })
  product_name: string;

  @IsNotEmpty({ message: 'product Price is required' })
  product_price: number;

  @IsNotEmpty({ message: 'product stock is required' })
  product_stock: number;
}
