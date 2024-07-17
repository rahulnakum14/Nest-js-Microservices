import { Injectable } from '@nestjs/common';
import { Inventory } from '../schema/inventory.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { inventoryDto } from '../dto/inventory.dto';

@Injectable()
export class inventoryService {
  constructor(
    @InjectModel(Inventory.name)
    private readonly inventoryModel: Model<Inventory>,
  ) {}

  async updateStock(
    id: string,
    product_stock: number,
  ): Promise<inventoryDto | { message: string }> {
    const updatedInventory = await this.inventoryModel.findById(id).exec();

    if (!updatedInventory) {
      return { message: 'Inventory item not found' };
    }

    updatedInventory.product_stock = product_stock;
    await updatedInventory.save();

    return updatedInventory;
  }

  async createProduct(
    product_name: string,
    product_price: number,
    product_stock: number,
  ): Promise<inventoryDto> {
    const newOrder = await this.inventoryModel.create({
      product_name: product_name,
      product_price: product_price,
      product_stock: product_stock,
    });
    await newOrder.save();
    return newOrder;
  }
}
