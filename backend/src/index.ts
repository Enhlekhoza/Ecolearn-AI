import express from 'express';
import routes from './routes';
import cors from 'cors';
import dotenv from 'dotenv';
import { logger } from './middleware/logging';
import { errorHandler } from './middleware/error';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api', routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
