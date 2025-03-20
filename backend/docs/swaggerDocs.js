const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Address Mapper API',
    version: '1.0.0',
    description: 'API documentation for Address Mapper backend',
  },
  servers: [
    {
      url: 'http://localhost:7004',
      description: 'Development Server, use this only while doing local development',
    }
  ],
  paths: {
    '/health': {
      get: {
        summary: 'Health Check',
        description: 'Returns server health status.',
        responses: {
          200: {
            description: 'Server is running',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'ok' },
                    message: { type: 'string', example: 'Server is running' },
                  },
                },
              },
            },
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string', example: 'Internal server error' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      LocationHistory: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '60b6c0f3c1f6b314541c2a93' },
          source: { type: 'object' },
          destination: { type: 'object' },
          distanceInKMs: { type: 'number', format: 'float', example: 3940.5 },
          createdAt: { type: 'string', format: 'date-time', example: '2023-06-15T12:30:00.000Z',},
        },
      },
    },
  },
}

export default swaggerDefinition
