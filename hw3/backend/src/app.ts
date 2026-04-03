import 'dotenv/config';
import { config } from './config';
import express, { Application } from 'express';
import { db } from './db/db';
import authRoutes from './routes/authRoutes';

const PORT = config.server.port;

const app: Application = express();

app.use(express.json());
app.use('/auth', authRoutes);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello from App Engine!');
});

async function start(): Promise<void> {
  try {
    const result = await db.query<{ connected: number }>('select 1 as connected');
    console.log('Database connection successful:', result.rows[0]);

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

void start();