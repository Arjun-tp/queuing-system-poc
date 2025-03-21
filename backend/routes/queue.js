import express from 'express'
import { addToQueue } from '../controllers/queue.js'

const router = express.Router()

router.post('/add-to-queue', addToQueue)

export default router
