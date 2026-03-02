import 'dotenv/config';

export const config = {
    db: {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'my_api_db',
        password: process.env.DB_PASSWORD || '',
        port: parseInt(process.env.DB_PORT || '5432'),
    },
    server: {
        port: parseInt(process.env.PORT || '3000'),
    }
};