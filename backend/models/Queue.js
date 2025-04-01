import mongoose from 'mongoose'

const queueSchema = new mongoose.Schema({
  queueNo: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['IN_QUEUE', 'COMPLETED', 'CANCELLED'],
  },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Queue', queueSchema)
