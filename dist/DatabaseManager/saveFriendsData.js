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
exports.addFriendRequest = addFriendRequest;
exports.acceptFriendRequest = acceptFriendRequest;
exports.rejectFriendRequest = rejectFriendRequest;
exports.removeFriend = removeFriend;
exports.blockUser = blockUser;
exports.unblockUser = unblockUser;
const promise_1 = __importDefault(require("mysql2/promise"));
// Database connection setup
const pool = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alireza1995!',
    database: 'game_db',
});
function addFriendRequest(playerToken, friendToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [result] = yield pool.query('SELECT friendsRequests FROM players WHERE playerToken = ?', [playerToken]);
            if (result.length === 0) {
                return { success: false, message: "User not found" };
            }
            let friendRequests = [];
            try {
                const currentRequests = result[0].friendsRequests || '[]';
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
                return { success: false, message: "Error parsing friend requests" };
            }
            if (friendRequests.includes(friendToken)) {
                return { success: false, message: "Friend request already sent" };
            }
            friendRequests.push(friendToken);
            yield pool.query('UPDATE players SET friendsRequests = ? WHERE playerToken = ?', [JSON.stringify(friendRequests), playerToken]);
            return { success: true, message: "Friend request sent successfully" };
        }
        catch (error) {
            console.error('Error in addFriendRequest:', error);
            return { success: false, message: "Error requesting friend" };
        }
    });
}
function acceptFriendRequest(playerToken, friendToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [user] = yield pool.query('SELECT friendsRequests, friendsList FROM players WHERE playerToken = ?', [playerToken]);
            if (user.length === 0) {
                return { success: false, status: 404, message: 'User not found' };
            }
            let friendRequests = JSON.parse(user[0].friendsRequests || '[]');
            let friends = Array.isArray(JSON.parse(user[0].friendsList))
                ? JSON.parse(user[0].friendsList)
                : [];
            const requestIndex = friendRequests.indexOf(friendToken);
            if (requestIndex === -1) {
                return { success: false, status: 400, message: 'Friend request not found' };
            }
            friendRequests.splice(requestIndex, 1);
            if (!friends.includes(friendToken)) {
                friends.push(friendToken);
            }
            yield pool.query('UPDATE players SET friendsRequests = ?, friendsList = ? WHERE playerToken = ?', [JSON.stringify(friendRequests), JSON.stringify(friends), playerToken]);
            return { success: true };
        }
        catch (error) {
            console.error('Error accepting friend request:', error);
            return { success: false, status: 500, message: 'Error accepting friend request' };
        }
    });
}
function rejectFriendRequest(playerToken, friendToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [user] = yield pool.query('SELECT friendsRequests FROM players WHERE playerToken = ?', [playerToken]);
            if (user.length === 0) {
                return { success: false, status: 404, message: 'User not found' };
            }
            let friendRequests = JSON.parse(user[0].friendsRequests || '[]');
            const requestIndex = friendRequests.indexOf(friendToken);
            if (requestIndex === -1) {
                return { success: false, status: 400, message: 'Friend request not found' };
            }
            friendRequests.splice(requestIndex, 1);
            yield pool.query('UPDATE players SET friendsRequests = ? WHERE playerToken = ?', [JSON.stringify(friendRequests), playerToken]);
            return { success: true };
        }
        catch (error) {
            console.error('Error rejecting friend request:', error);
            return { success: false, status: 500, message: 'Error rejecting friend request' };
        }
    });
}
function removeFriend(playerToken, friendToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Step 1: Fetch the current friends list for the user
            const [user] = yield pool.query('SELECT friendsList FROM players WHERE playerToken = ?', [playerToken]);
            if (user.length === 0) {
                return { success: false, status: 404, message: 'User not found' };
            }
            // Step 2: Parse the current friends list
            let friends = JSON.parse(user[0].friendsList || '[]');
            // Step 3: Check if the friend exists
            const friendIndex = friends.indexOf(friendToken);
            if (friendIndex === -1) {
                return { success: false, status: 400, message: 'Friend not found in friends list' };
            }
            // Step 4: Remove the friend from the friends list
            friends.splice(friendIndex, 1);
            // Step 5: Update the database with the new friends list
            yield pool.query('UPDATE players SET friendsList = ? WHERE playerToken = ?', [JSON.stringify(friends), playerToken]);
            return { success: true };
        }
        catch (error) {
            console.error('Error removing friend:', error);
            return { success: false, status: 500, message: 'Error removing friend' };
        }
    });
}
function blockUser(playerToken, blockToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [user] = yield pool.query('SELECT blockList FROM players WHERE playerToken = ?', [playerToken]);
            if (user.length === 0) {
                return { success: false, status: 404, message: 'User not found' };
            }
            let blockedUsers = JSON.parse(user[0].blockedUsers || '[]');
            if (blockedUsers.includes(blockToken)) {
                return { success: false, status: 400, message: 'User already blocked' };
            }
            blockedUsers.push(blockToken);
            yield pool.query('UPDATE players SET blockList = ? WHERE playerToken = ?', [JSON.stringify(blockedUsers), playerToken]);
            return { success: true, message: 'User blocked successfully' };
        }
        catch (error) {
            console.error('Error blocking user:', error);
            return { success: false, status: 500, message: 'Error blocking user' };
        }
    });
}
function unblockUser(playerToken, unblockToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [user] = yield pool.query('SELECT blockList FROM players WHERE playerToken = ?', [playerToken]);
            if (user.length === 0) {
                return { success: false, status: 404, message: 'User not found' };
            }
            let blockedUsers = JSON.parse(user[0].blockedUsers || '[]');
            const blockIndex = blockedUsers.indexOf(unblockToken);
            if (blockIndex === -1) {
                return { success: false, status: 400, message: 'User is not blocked' };
            }
            // Remove the user from the blockedUsers list
            blockedUsers.splice(blockIndex, 1);
            yield pool.query('UPDATE players SET blockList = ? WHERE playerToken = ?', [JSON.stringify(blockedUsers), playerToken]);
            return { success: true, message: 'User unblocked successfully' };
        }
        catch (error) {
            console.error('Error unblocking user:', error);
            return { success: false, status: 500, message: 'Error unblocking user' };
        }
    });
}
