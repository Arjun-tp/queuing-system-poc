import dotenv from 'dotenv'
dotenv.config()

export const google_config = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
}

export const mongo_config = {
  MONGO_USERNAME: process.env.MONGO_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_HOST: process.env.MONGO_HOST,
}
