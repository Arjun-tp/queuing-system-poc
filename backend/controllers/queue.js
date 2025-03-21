import { sendToQueue } from '../utils/kafka/producer.js'

export const addToQueue = async (req, res) => {
  try {
    const { message } = req.body

    if (!message) return res.status(400).json({ error: 'Message is required' })

    await sendToQueue({ message, timestamp: Date.now() })
    res.json({ status: 'added_to_queue', message })
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve history', err })
  }
}
