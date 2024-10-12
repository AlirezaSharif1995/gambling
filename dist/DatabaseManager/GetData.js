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
exports.getData = getData;
exports.getGameByPlayerToken = getGameByPlayerToken;
exports.getPlayerData = getPlayerData;
exports.getGroupData = getGroupData;
const promise_1 = __importDefault(require("mysql2/promise"));
const jwt_1 = require("../utils/jwt");
const pool = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alireza1995!',
    database: 'game_db',
});
const notValidRequest = ['playerToken'];
function loginUser(playerToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch user from the database by email
            const [rows] = yield pool.query('SELECT * FROM players WHERE playerToken = ?', [playerToken]);
            // If no user is found
            if (rows.length === 0) {
                return { success: false, message: 'User not found' };
            }
            const user = rows[0]; // Access the first row (the user)
            // Generate a JWT token
            const token = (0, jwt_1.generateToken)(playerToken); // Assuming user.id is the identifier
            return { success: true, message: 'Login successful', token };
        }
        catch (error) {
            console.error('Error logging in user:', error);
            return { success: false, message: 'Error logging in user: ' + error };
        }
    });
}
function getData(type, playerToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (notValidRequest.includes(type)) {
                return { success: false, message: `The input "${type}" is not valid.` };
            }
            const query = `SELECT * FROM players WHERE playerToken = ?`;
            const [rows] = yield pool.query(query, [playerToken]);
            if (rows.length > 0 && rows[0].hasOwnProperty(type)) {
                return rows[0][type];
            }
            else {
                return { success: false, message: `Property '${type}' not found in the result.` };
            }
        }
        catch (error) {
            console.error('Error get data:', error);
            return { success: false, message: 'Error get data: ' + error };
        }
    });
}
function getGameByPlayerToken(playerToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
          SELECT * FROM game_results 
          WHERE player1_id = ? OR player2_id = ?
        `;
            const [rows, fields] = yield pool.query(query, [playerToken, playerToken]);
            if (rows.length === 0) {
                return { success: false, message: 'No game results found for this player' };
            }
            return { success: true, data: rows };
        }
        catch (error) {
            console.error('Error fetching game results by player ID:', error);
            return { success: false, message: 'Failed to retrieve game results' };
        }
    });
}
function getPlayerData(playerToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
            SELECT winCount, loseCount, coins, avatar, username, \`groups\` 
            FROM players 
            WHERE playerToken = ?
        `;
            const [rows, fields] = yield pool.query(query, [playerToken]);
            if (rows.length === 0) {
                return { success: false, message: 'Player not found' };
            }
            return { success: true, data: rows[0] };
        }
        catch (error) {
            console.error('Error fetching player data:', error);
            return { success: false, message: 'Failed to retrieve player data' };
        }
    });
}
function getGroupData(groupID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
            SELECT name, avatar, description, leader_id, is_private, members FROM \`group\`
            WHERE id = ?
        `;
            const [rows, fields] = yield pool.query(query, [groupID]);
            if (rows.length === 0) {
                return { success: false, message: 'Group not found' };
            }
            return { success: true, data: rows[0] };
        }
        catch (error) {
            console.error('Error fetching Group data:', error);
            return { success: false, message: 'Failed to retrieve Group data' };
        }
    });
}
