import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import 'express-async-errors';
import cors from 'cors';

const { PORT } = process.env;
const app = express();
const router = express.Router();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Load routes, interceptors and handlers
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});