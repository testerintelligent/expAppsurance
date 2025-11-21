// swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger definition
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contact Management API',
      version: '1.0.0',
      description: 'API documentation for managing contacts using Node.js, Express, and MongoDB',
      contact: {
        name: 'Santhosh Kuppan',
        email: 'your.email@example.com',
      },
    },
    servers: [
      {
        url: 'http://10.192.190.158/:5000/api',
        description: 'Local server',
      },
    ],
    components: {
      schemas: {
        ContactDetails: {
          type: 'object',
          required: ['firstName', 'lastName', 'dateOfBirth'],
          properties: {
            customerId: { type: 'string', example: 'CUS123456' },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            email: { type: 'string', example: 'john.doe@example.com' },
            phone: { type: 'string', example: '+15551234567' },
            dateOfBirth: { type: 'string', format: 'date', example: '1990-05-15' },
            gender: { type: 'string', enum: ['Male', 'Female', 'Other'], example: 'Male' },
            address: { type: 'string', example: '123 Main Street' },
            city: { type: 'string', example: 'New York' },
            state: { type: 'string', example: 'NY' },
            zipCode: { type: 'string', example: '10001' },
            organization: { type: 'string', example: 'ABC Corp' },
            producerCode: { type: 'string', example: 'P12345' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        AccountDetails: {
          type: "object",
          properties: {
            customerId: { type: "string", description: "MongoDB ID of the linked contact" },
            accountType: { type: "string", enum: ["Individual", "Corporate"], example: "Individual" },
            accountHolderName: { type: "string", example: "Alice Smith" },
            status: { type: "string", enum: ["Active", "Inactive", "Closed"], example: "Active" },
            createdAt: { type: "string", format: "date-time" },
          },
          required: ["customerId", "accountType", "accountHolderName"],
        }, 
      },
    },
  },
  apis: ['./Controller/ContactController.js', './Controller/AccountController.js'], // Path to your controllers containing Swagger annotations
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
