import express from 'express'
import healthRoutes from './health.js'
import historyRoutes from './history.js'
import queueRoutes from './queue.js'

const router = express.Router()

router.use('/health', healthRoutes)
router.use('/history', historyRoutes)
router.use('/queue', queueRoutes)

export default router
