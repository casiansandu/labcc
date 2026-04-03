import { Pool, QueryResult, QueryResultRow } from 'pg';
import { config } from '../config';

const pool = new Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
});

export const db = {
  query<T extends QueryResultRow = QueryResultRow>(text: string, params: unknown[] = []): Promise<QueryResult<T>> {
    return pool.query<T>(text, params);
  },
  pool,
};
