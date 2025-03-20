import express from 'express'
import healthRoutes from './health.js'
import historyRoutes from './history.js'

const router = express.Router()

router.use('/health', healthRoutes)
router.use('/history', historyRoutes)

export default router
