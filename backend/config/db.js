import mongoose from 'mongoose'
import { mongo_config } from './vars.js'

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...')
    const mongoURI = `mongodb+srv://${mongo_config.MONGO_USERNAME}:${mongo_config.MONGO_PASSWORD}@${mongo_config.MONGO_HOST}/address_mapper`
    await mongoose.connect(mongoURI)
    console.log('*** MongoDB Connected ***')
  } catch (error) {
    console.log('MongoDB Connection Error:', error)
    process.exit(1)
  }
}

export default connectDB
