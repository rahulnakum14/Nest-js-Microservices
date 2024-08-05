// consume.js
import { Kafka } from 'kafkajs';

// Create a new Kafka instance
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'my-group' });

const run = async () => {
  // Connect the consumer
  await consumer.connect();
  console.log('Consumer connected');

  // Subscribe to the topic
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  // Start consuming messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
};

// Run the script
run().catch(console.error);
