const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
// const swaggerDocs = require('./swagger.json');

const routes = require('./routes');

const app = express();

// Enable cors
const origin = ['*'];
const corsOptions = {
  allowedHeaders: [
    'Origin',
    ' X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-Access-Token',
  ],
  origin,
  methods: ['OPTIONS', 'GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

// Application Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Documentation using swagger UI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

routes(app);

// 404 Error Handler
app.use('*', (req, res) => res.sendStatus(404));

module.exports = app;
