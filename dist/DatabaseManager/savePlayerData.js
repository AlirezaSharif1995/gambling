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
exports.updateProfile = updateProfile;
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alireza1995!',
    database: 'game_db',
});
function updateProfile(playerToken, type, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Properly typing the query result
            const [rows] = yield pool.query('SELECT * FROM players WHERE playerToken = ?', [playerToken]);
            if (rows.length === 0) {
                return { success: false, message: 'User not found' };
            }
            const query = `UPDATE players SET ${[type]} = ? WHERE playerToken = ?`;
            const [result] = yield pool.query(query, [data, playerToken]);
            return { success: result.affectedRows > 0 };
        }
        catch (error) {
            console.error('Error updating user data:', error);
            return { success: false };
        }
    });
}
