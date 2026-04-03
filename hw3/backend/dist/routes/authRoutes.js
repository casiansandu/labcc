"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createUserController_1 = require("../controllers/createUserController");
const authRoutes = (0, express_1.Router)();
authRoutes.post('/register', createUserController_1.createUserController);
exports.default = authRoutes;
