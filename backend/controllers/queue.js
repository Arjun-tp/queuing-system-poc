import { sendToQueue } from '../utils/kafka/producer.js'
import Queue from '../models/Queue.js'
import { QUEUE_STATUS } from '../config/constant.js'

/**
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const addToQueue = async (req, res) => {
  try {
    const { message } = req.body

    if (!message) return res.status(400).json({ error: 'Message is required' })

    await sendToQueue({ message, timestamp: Date.now() })

    const saveQueue = new Queue({
      queueNo: message,
      status: QUEUE_STATUS.IN_QUEUE,
    })

    await saveQueue.save()

    res.json({ status: QUEUE_STATUS.IN_QUEUE, message })
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve history', err })
  }
}

/**
 * Retrieves paginated location history from the database.
 *
 * @async
 * @function getHistory
 * @param req - request object containing query parameters `page` and `limit`.
 * @param res - response object used to return the paginated history data.
 * @returns {Promise<void>} Responds with a JSON object containing the paginated history data.
 */

export const getAllQueues = async (req, res) => {
  try {
    let { page, limit } = req.query

    page = parseInt(page) || 1
    limit = parseInt(limit) || 5

    const skip = (page - 1) * limit

    const history = await Queue.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const totalRecords = await Queue.countDocuments()

    res.json({
      page,
      limit,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      data: history,
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve history', err })
  }
}
