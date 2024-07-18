import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../interfaces/product.interface';
import { CreateProductDto } from '../dto/create-product.dto';
import { Kafka } from 'kafkajs';

@Injectable()
export class InventoryService {
  private readonly kafka = new Kafka({ brokers: ['kafka:9092'] });
  private readonly producer = this.kafka.producer();

  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return await createdProduct.save();
  }

  async updateStock(productId: string, quantity: number): Promise<Product> {
    const product = await this.productModel.findById(productId);
    product.stock -= quantity;
    await product.save();

    // Publish stock update event
    await this.producer.connect();
    await this.producer.send({
      topic: 'stock-updated',
      messages: [{ value: JSON.stringify({ productId, stock: product.stock }) }],
    });

    return product;
  }
}
