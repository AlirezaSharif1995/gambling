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
exports.saveGameResult = saveGameResult;
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alireza1995!',
    database: 'game_db',
});
function saveGameResult(player1Id, player2Id, player1Score, player2Score, winnerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const gameId = generateToken(); // Unique identifier for the game (you can use a UUID or a custom token)
            const query = `
      INSERT INTO game_results (game_id, player1_id, player2_id, player1_score, player2_score, winner_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
            // Execute the query
            yield pool.query(query, [gameId, player1Id, player2Id, player1Score, player2Score, winnerId]);
            return { success: true, message: 'Game result saved successfully' };
        }
        catch (error) {
            console.error('Error saving game result:', error);
            return { success: false, message: 'Failed to save game result' };
        }
    });
}
function generateToken() {
    let token = '';
    for (let i = 0; i < 5; i++) {
        token += Math.floor(Math.random() * 10);
    }
    return token;
}
