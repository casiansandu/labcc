
export const config = {
    db: {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || (process.env.INSTANCE_CONNECTION_NAME ? `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}` : 'localhost'),
        database: process.env.DB_NAME || 'my_api_db',
        password: process.env.DB_PASSWORD || '',
        port: Number.parseInt(process.env.DB_PORT || '5432'),
        database_url: process.env.DATABASE_URL || 'postgresql://postgres:@localhost:5432/my_api_db',
    },
    server: {
        port: Number.parseInt(process.env.PORT || '3010'),
    }
};