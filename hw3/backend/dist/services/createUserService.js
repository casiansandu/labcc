"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserService = createUserService;
const db_1 = require("../db/db");
const hashPassword_1 = require("../utils/hashPassword");
async function createUserService(input) {
    const username = input.username.trim();
    const email = input.email.trim().toLowerCase();
    const fullName = input.fullName.trim();
    const passwordHash = (0, hashPassword_1.hashPassword)(input.password);
    const result = await db_1.db.query(`
      INSERT INTO users (username, email, full_name, password, birth_date, phone_number, profile_picture_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, username, email, full_name, birth_date, phone_number, profile_picture_url, created_at, updated_at
    `, [
        username,
        email,
        fullName,
        passwordHash,
        input.birthDate ?? null,
        input.phoneNumber ?? null,
        input.profilePictureUrl ?? null,
    ]);
    return result.rows[0];
}
