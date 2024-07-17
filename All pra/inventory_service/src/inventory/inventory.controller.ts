import { Controller } from '@nestjs/common';
import { inventoryService } from './inventory.service';
import { inventoryDto } from '../dto/inventory.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: inventoryService) {}

  @MessagePattern({ cmd: 'update_stock' })
  async getStock(
    @Payload() payload: { id: string; data: inventoryDto },
  ): Promise<inventoryDto | { message: string }> {
    const { id, data } = payload;

    if (!data) {
      return { message: 'Data is required' };
    }

    const { product_stock } = data;
    return await this.inventoryService.updateStock(id, product_stock);
  }

  @MessagePattern({ cmd: 'create_product' })
  async createProduct(data: inventoryDto): Promise<string | inventoryDto> {
    const { product_name, product_price, product_stock } = data;
    const newProduct = await this.inventoryService.createProduct(
      product_name,
      product_price,
      product_stock,
    );

    //Inventory Stock is updated so Publish the event here

    return newProduct;
  }
}
