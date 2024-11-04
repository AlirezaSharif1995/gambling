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
exports.createGroup = createGroup;
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alireza1995!',
    database: 'game_db',
});
function createGroup(name, avatar, description, leader_id, is_private, members) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const id = generateToken();
            const query = `
            INSERT INTO \`group\` (id, name, avatar, description, leader_id, is_private, members)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
            yield pool.query(query, [id, name, avatar, description, leader_id, is_private, members]);
            const [result] = yield pool.query('SELECT `groups` FROM players WHERE playerToken = ?', [leader_id]);
            let groups = [];
            const currentGroups = ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.groups) || '[]';
            try {
                if (typeof currentGroups === 'string') {
                    groups = JSON.parse(currentGroups);
                }
                else if (Array.isArray(currentGroups)) {
                    groups = currentGroups; // If it's already an array
                }
            }
            catch (jsonError) {
                console.error('Malformed JSON in currentGroups:', currentGroups, jsonError);
                groups = [];
            }
            if (groups.includes(id)) {
                return { success: false, message: 'Group already exists' };
            }
            groups.push(id);
            yield pool.query('UPDATE players SET `groups` = ? WHERE playerToken = ?', [JSON.stringify(groups), leader_id]);
            return { success: true, message: 'Group created successfully', id };
        }
        catch (error) {
            console.error('Error Creating Group:', error);
            return { success: false, message: 'Error Creating Group', error };
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
