const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const requireDir = require('require-dir');
requireDir('../models', { recurse: true });
const outputFile = 'src/utils/swagger-output.json';
const os = require('os');
const ip = require('ip');

const hostname = os.hostname();
const ipAddress = ip.address();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: `${ipAddress}:${process.env.PORT || 5000}`,
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {},
};

for (const [modelName, model] of Object.entries(mongoose.models)) {
  doc.definitions[modelName] = model.schema.obj;
}

const endpointsFiles = [
  'src/index.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc);
