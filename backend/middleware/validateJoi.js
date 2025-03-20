export const validateJoi = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false })

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    })
  }

  next()
}
