import { Kafka, logLevel } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'queue-service',
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
})

const producer = kafka.producer()

export const sendToQueue = async (message) => {
  await producer.connect()
  await producer.send({
    topic: 'queue_topic',
    messages: [{ value: JSON.stringify(message) }],
  })
  console.log('Message sent:', message)
}
