import Location from '../models/Location.js'

/**
 * Retrieves paginated location history from the database.
 *
 * @async
 * @function getHistory
 * @param req - request object containing query parameters `page` and `limit`.
 * @param res - response object used to return the paginated history data.
 * @returns {Promise<void>} Responds with a JSON object containing the paginated history data.
 */

export const getHistory = async (req, res) => {
  try {
    let { page, limit } = req.query

    page = parseInt(page) || 1
    limit = parseInt(limit) || 5

    const skip = (page - 1) * limit

    const history = await Location.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const totalRecords = await Location.countDocuments()

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
