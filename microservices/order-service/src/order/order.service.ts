import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../interfaces/order.interface';
import { CreateOrderDto } from '../dto/create-order.dto';
import { RpcException } from '@nestjs/microservices';
import { KafkaService } from 'kafka/kafka.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OrderService {
  private productInventory: Map<string, number> = new Map();


  constructor(@InjectModel('Order') private readonly orderModel: Model<Order>,
    private readonly kafkaService: KafkaService
  ) { }

  async onModuleInit() {
    // Subscribe to product events
    this.kafkaService.subscribe('product_created', this.handleProductEvent.bind(this));
    this.kafkaService.subscribe('product_updated', this.handleProductEvent.bind(this));
  }

  private handleProductEvent(message: any) {
    const parsedMessage = JSON.parse(message);
    const id = parsedMessage.id;
    const stock = parsedMessage.stock
    this.productInventory.set(id, stock);
    console.log(this.productInventory);

    console.log(`Product event received: ID=${parsedMessage.id}, Stock=${parsedMessage.stock}`);
  }


  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { productId } = createOrderDto;

    if (!this.productInventory.has(productId) || this.productInventory.get(productId) <= 0) {
      throw new RpcException({
        code: 404,
        message: `Product with ID ${productId} is not available`,
      });
    }

    console.log('Creating order with product ID:', productId);

    const createdOrder = new this.orderModel(createOrderDto);
    const order = await createdOrder.save();

    // Send email
    await this.sendEmail('Order Created', `Hello, your order with product ID ${productId} has been created.`);

    return order;
  }


  private async sendEmail(subject: string, text: string) {
    // Create a transporter object using default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your preferred email service provider
      auth: {
        user: 'jay.b@moontechnolabs.com', // replace with your email
        pass: 'hnmzsbhxpvswlmkl', // replace with your email password
      },
    });

    // Send mail with defined transport object
    await transporter.sendMail({
      from: 'rahul.n+88@moontechnolabs.com', // sender address
      to: 'rahul.n+84@moontechnolabs.com', // list of receivers
      subject, // Subject line
      text, // plain text body
    });

    console.log('Email sent successfully');
  }


  async findOne(id: string): Promise<Order> {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const order = await this.orderModel.findById(id).exec();

      if (!order) {
        throw new RpcException({
          code: 404,
          message: `Order with ID ${id} not found`,
        });
      }
      return order;
    } else {
      throw new RpcException({
        message: `Wrong ObjectId of the order`,
      });
    }

  }


  // async listenForStockUpdates() {
  //   await this.consumer.connect();
  //   await this.consumer.subscribe({ topic: 'stock-updated', fromBeginning: true });

  //   await this.consumer.run({
  //     eachMessage: async ({ topic, partition, message }) => {
  //       const stockUpdate = JSON.parse(message.value.toString());
  //       // Handle stock update logic
  //       console.log('Stock Update:', stockUpdate);
  //     },
  //   });
  // }
}
// docker run -d --name zookeeper --network kafka-network -p 2181:2181 -e ZOOKEEPER_CLIENT_PORT=2181 confluentinc/cp-zookeeper:latest
// docker run -d --name kafka --network kafka-network -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka:latest
