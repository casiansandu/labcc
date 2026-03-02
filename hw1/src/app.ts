import * as http from 'http';
import { Pool } from 'pg';
import { config } from './config';

const pool = new Pool({
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port,
});

const PORT = config.server.port;

function getRequestBody(req: http.IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try { resolve(JSON.parse(body || '{}')); }
            catch (e) { reject(e); }
        });
    });
}

const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    const parts = url?.split('/').filter(Boolean) || [];
    const resource = parts[0];

    const id = parts[1] || null;

    res.setHeader('Content-Type', 'application/json');

    if (resource !== 'users') {
        res.statusCode = 404;
        return res.end(JSON.stringify({ error: 'Not Found' }));
    }

    try {
        if (method === 'GET') {
            if (id) {
                const result = await pool.query('SELECT id, email, username FROM users WHERE id = $1', [id]);
                console.log("Result for ID:", id, result.rows);
                if (result.rows.length === 0) { res.statusCode = 404; return res.end(); }
                return res.end(JSON.stringify(result.rows[0]));
            }
            const result = await pool.query('SELECT id, email, username FROM users');
            return res.end(JSON.stringify(result.rows));
        }

        if (method === 'POST') {
            if (id) { res.statusCode = 405; return res.end(); }
            const { email, username, password } = await getRequestBody(req);
            const result = await pool.query(
                'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id, email, username',
                [email, username, password]
            );
            res.statusCode = 201;
            return res.end(JSON.stringify(result.rows[0]));
        }

        if (method === 'PUT') {
            const { email, username, password } = await getRequestBody(req);
            if (id) {
                const result = await pool.query(
                    'UPDATE users SET email=$1, username=$2, password=$3 WHERE id=$4 RETURNING id, email, username',
                    [email, username, password, id]
                );
                if (result.rowCount === 0) { res.statusCode = 404; return res.end(); }
                return res.end(JSON.stringify(result.rows[0]));
            }
            await pool.query('DELETE FROM users');
            return res.end(JSON.stringify({ message: "Collection reset" }));
        }

        if (method === 'DELETE') {
            if (id) {
                await pool.query('DELETE FROM users WHERE id = $1', [id]);
            } else {
                await pool.query('DELETE FROM users');
            }
            res.statusCode = 204;
            return res.end();
        }

    } catch (err: any) {
        console.error(err);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: err.message }));
    }
});

server.listen(PORT, () => console.log(`Postgres API running on port ${PORT}`));