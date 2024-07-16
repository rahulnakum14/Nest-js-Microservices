import { Controller } from '@nestjs/common';
import { inventoryService } from './inventory.service';
import { inventoryDto } from '../dto/inventory.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: inventoryService) {}

  @MessagePattern({ cmd: 'update_stock' })
  async getStock(): Promise<number[]> {
    const stocks = await this.inventoryService.getStock();
    return stocks.map((stock) => stock.product_stock);
  }

  @MessagePattern({ cmd: 'create_product' })
  async createProduct(data: inventoryDto): Promise<string> {
    const { product_name, product_price, product_stock } = data;
    const newOrder = await this.inventoryService.createProduct(
      product_name,
      product_price,
      product_stock,
    );
    return `Created product with name: ${newOrder.product_name}`;
  }
}
