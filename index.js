'use strict';

var fs = require('fs'),
  path = require('path'),
  http = require('http'),
  cors = require("cors");
require('dotenv').config();
var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var dbMangment = require('./strapi-database/lib/index')
var serverPort = process.env.PORT || 3005;
const swaggerMongoose = require('swagger-mongoose');
const dbConfig = require('./database.json')

// reading swagger definitions and convert to mongoose
var swagger = fs.readFileSync(path.join(__dirname, './swagger.json'));

var models = swaggerMongoose.compile(swagger, { default: { 'schema-options': { timestamps: true } } }).models;

var dbM = dbMangment.createDatabaseManager(dbConfig)
// DB *(Mongo, Mongoose)*
// const mongoose = require('mongoose');
// const mongo_uri =
//   process.env.MONGO_URL || 'mongodb://admin:admin1234@ds135514.mlab.com:35514/paymob';
// mongoose.connect(
//   mongo_uri,
//   {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true
//   },
//   function (err) {
//     if (err) {
//       throw err;
//     } else {
//       console.log(`Successfully connected to ${mongo_uri}`);
//     }
//   }
// );

module.exports = {
  models,
  dbM
};
// swaggerRouter configuration
var options = {
  // swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './middleware'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

app.use(cors());

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});
