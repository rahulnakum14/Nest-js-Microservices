import { Kafka } from 'kafkajs';

// Create a new Kafka instance
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const run = async () => {
  // Connect the producer
  await producer.connect();
  console.log('Producer connected');

  // Publish a message
  await producer.send({
    topic: 'test-topic',
    messages: [{ key: 'key1', value: 'Hello Kafka' }],
  });

  console.log('Message published');

  // Disconnect the producer
  await producer.disconnect();
  console.log('Producer disconnected');
};

// Run the script
run().catch(console.error);
