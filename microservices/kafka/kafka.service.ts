// src/kafka/kafka.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Consumer, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092'],
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'my-group' });

    this.connect(); // Automatically connect when service is instantiated
  }

  async connect() {
    await this.producer.connect();
    await this.consumer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  async produce(topic: string, messages: { key: string, value: string }[]) {
    await this.producer.send({
      topic,
      messages: messages.map(message => ({
        key: message.key,
        value: message.value,
      })),
    });
  }

  async subscribe(topic: string, callback: (message: string) => void) {
    await this.consumer.subscribe({ topic, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        callback(message.value.toString());
      },
    });
  }

  async publish(topic: string, message: object) {
    await this.produce(topic, [{ key: '', value: JSON.stringify(message) }]);
  }
}


// // src/kafka/kafka.service.ts
// import { Injectable, OnModuleDestroy } from '@nestjs/common';
// import { Kafka, Consumer, Producer } from 'kafkajs';

// @Injectable()
// export class KafkaService implements OnModuleDestroy {
//   private kafka: Kafka;
//   private producer: Producer;
//   private consumer: Consumer;

//   constructor() {
//     this.kafka = new Kafka({
//       clientId: 'my-app',
//       brokers: ['localhost:9092'],
//     });

//     this.producer = this.kafka.producer();
//     this.consumer = this.kafka.consumer({ groupId: 'my-group' });

//     this.connect();
//   }

//   async connect() {
//     await this.producer.connect();
//     await this.consumer.connect();
//   }

//   async onModuleDestroy() {
//     await this.producer.disconnect();
//     await this.consumer.disconnect();
//   }

//   async produce(topic: string, messages: { key: string, value: string }[]) {
//     await this.producer.send({
//       topic,
//       messages: messages.map(message => ({
//         key: message.key,
//         value: message.value,
//       })),
//     });
//   }

//   async subscribe(topic: string, callback: (message: string) => void) {
//     await this.consumer.subscribe({ topic, fromBeginning: true });
//     await this.consumer.run({
//       eachMessage: async ({ message }) => {
//         callback(message.value.toString());
//       },
//     });
//   }

//   // Add the publish method
//   async publish(topic: string, message: object) {
//     await this.produce(topic, [{ key: '', value: JSON.stringify(message) }]);
//   }
// }
