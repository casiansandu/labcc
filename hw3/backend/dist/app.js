"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const PORT = config_1.config.server.port;
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Hello from App Engine!');
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
