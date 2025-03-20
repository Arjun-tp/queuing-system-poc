import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
  source: {
    name: { type: String, required: true }
  },
  destination: {
    name: { type: String, required: true },
  },
  distanceInKMs: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Location', locationSchema)
