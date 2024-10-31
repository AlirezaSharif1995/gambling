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
exports.requestJoinGroup = requestJoinGroup;
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alireza1995!',
    database: 'game_db',
});
function requestJoinGroup(playerToken, groupID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [result] = yield pool.query('SELECT requests FROM `group` WHERE id = ?', [groupID]);
            if (result.length === 0) {
                return { success: false, message: "Group not found" };
            }
            let friendRequests = [];
            try {
                const currentRequests = result[0].requests || '[]';
                if (currentRequests === '{}' || currentRequests === '') {
                    friendRequests = [];
                }
                else {
                    friendRequests = JSON.parse(currentRequests);
                }
                if (!Array.isArray(friendRequests)) {
                    throw new Error('Friend requests is not an array');
                }
            }
            catch (error) {
                console.error('Error parsing friendRequests:', error);
                return { success: false, message: "Error parsing join Group requests" };
            }
            console.log(result[0].requests);
            if (friendRequests.includes(playerToken)) {
                return { success: false, message: "Join request already sent" };
            }
            friendRequests.push(playerToken);
            yield pool.query('UPDATE `group` SET requests = ? WHERE id = ?', [JSON.stringify(friendRequests), groupID]);
            return { success: true, message: "Group request sent successfully" };
        }
        catch (error) {
            console.error('Error in addFriendRequest:', error);
            return { success: false, message: "Error requesting friend" };
        }
    });
}
