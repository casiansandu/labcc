import { config } from './config';
import express, { Application } from 'express';

const PORT = config.server.port;

const app: Application = express();

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello from App Engine!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});