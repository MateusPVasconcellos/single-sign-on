import 'reflect-metadata';
import 'dotenv/config';
import routes from './src/route/index';
import express from 'express';
import bodyParser from 'body-parser';
import 'express-async-errors';
import cors from 'cors';
import { errorHandler } from './src/middleware/error-handler';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });

const { PORT } = process.env;
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Error handlers
console.log('Loading error handlers...');
routes.use(errorHandler);

// Load routes, interceptors and handlers
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
