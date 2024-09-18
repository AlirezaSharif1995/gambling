"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
const promise_1 = __importDefault(require("mysql2/promise"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt"); // Assuming you have a generateToken utility function
// Database connection setup
const pool = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alireza1995!',
    database: 'game_db',
});
function loginUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch user from the database by email
            const [rows] = yield pool.query('SELECT * FROM players WHERE email = ?', [email]);
            // If no user is found
            if (rows.length === 0) {
                return { success: false, message: 'User not found' };
            }
            const user = rows[0]; // Access the first row (the user)
            // Compare the password with the hashed password stored in the database
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return { success: false, message: 'Invalid password' };
            }
            // Generate a JWT token
            const token = (0, jwt_1.generateToken)(user.id); // Assuming user.id is the identifier
            return { success: true, message: 'Login successful', token };
        }
        catch (error) {
            console.error('Error logging in user:', error);
            return { success: false, message: 'Error logging in user: ' + error };
        }
    });
}
