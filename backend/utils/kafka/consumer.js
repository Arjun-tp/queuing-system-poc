import { Kafka, logLevel } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'queue-service',
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
})

const consumer = kafka.consumer({ groupId: 'queue-group' })

export const initConsumer = async (io) => {
  await consumer.connect()
  console.log('KafkaJS consumer connected')

  await consumer.subscribe({ topic: 'queue_topic', fromBeginning: true })
  console.log('Listening for messages on topic: queue_topic')

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString())
      console.log('Message received:', data)
      io.emit('queue-update', data)
    },
  })
}
