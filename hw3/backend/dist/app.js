"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const db_1 = require("./db/db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const PORT = config_1.config.server.port;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/auth', authRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Hello from App Engine!');
});
async function start() {
    try {
        const result = await db_1.db.query('select 1 as connected');
        console.log('Database connection successful:', result.rows[0]);
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}...`);
        });
    }
    catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}
void start();
