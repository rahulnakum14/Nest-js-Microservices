import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../interfaces/product.interface';
import { CreateProductDto } from '../dto/create-product.dto';
import { KafkaService } from '../../../kafka/kafka.service';

@Injectable()
@UsePipes(new ValidationPipe())
export class InventoryService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>,
  private readonly kafkaService: KafkaService
) {}

async create(createProductDto: CreateProductDto): Promise<Product> {
  const createdProduct = new this.productModel(createProductDto);
  const product = await createdProduct.save();

  console.log('this is idd', product.id);
  console.log('this is stockkk',product.stock);
  
  // Publish product creation event
  this.kafkaService.publish('product_created', { id: product._id, stock: product.stock });

  console.log('this is published the events $$$$$$$$$$$$$$$$$$$$');
  
  return product;
}

  async updateStock(id: string, stock: number): Promise<Product> {
    console.log('update stock calling', id, stock);
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    product.stock = stock;
    await product.save();
    this.kafkaService.publish('product_updated', { id: product._id, stock: product.stock });

    return product;
  }


}
