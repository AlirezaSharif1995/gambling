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
exports.registerUser = registerUser;
exports.updateData = updateData;
const promise_1 = __importDefault(require("mysql2/promise"));
// Database connection setup
const pool = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alireza1995!',
    database: 'game_db',
});
function registerUser(User) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield pool.getConnection();
            const query = `
          INSERT INTO players (playerToken) 
          VALUES (?)
        `;
            yield connection.execute(query, [
                User.playerToken
            ]);
            console.log(`Player ${User.username} saved to the database.`);
            connection.release();
        }
        catch (error) {
            console.error('Error saving player:', error);
        }
    });
}
function updateData(playerToken, updatedUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `UPDATE players SET username = ?, birthDate = ?, avatar = ? WHERE playerToken = ?`;
            // Casting result to ResultSetHeader to access affectedRows
            const [result] = yield pool.query(query, [
                updatedUser.username,
                updatedUser.birthDate,
                updatedUser.avatar,
                playerToken
            ]);
            // Check if rows were affected
            return { success: result.affectedRows > 0 };
        }
        catch (error) {
            console.error('Error updating user data:', error);
            return { success: false };
        }
    });
}
