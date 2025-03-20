import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import swaggerDefinition from '../docs/swaggerDocs.js'

// Swagger Options
const options = {
  definition: swaggerDefinition,
  apis: [],
}

// Generate Swagger JSON
const swaggerSpec = swaggerJSDoc(options)

// Set up Swagger in Express
export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  console.log('Swagger Docs available at: */api-docs')
}
