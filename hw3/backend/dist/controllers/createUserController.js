"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = createUserController;
const createUserService_1 = require("../services/createUserService");
async function createUserController(req, res) {
    try {
        const { username, email, full_name: fullName, password, birth_date: birthDate, phone_number: phoneNumber, profile_picture_url: profilePictureUrl, } = req.body;
        if (!username || !email || !fullName || !password) {
            res.status(400).json({ error: 'username, email, full_name, and password are required' });
            return;
        }
        const createdUser = await (0, createUserService_1.createUserService)({
            username,
            email,
            fullName,
            password,
            birthDate,
            phoneNumber,
            profilePictureUrl,
        });
        res.status(201).json(createdUser);
    }
    catch (error) {
        const pgError = error;
        if (pgError.code === '23505') {
            res.status(409).json({ error: 'email or username already exists', detail: pgError.detail });
            return;
        }
        res.status(500).json({ error: 'failed to create user', detail: pgError.message });
    }
}
