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
exports.acceptJoinGroup = acceptJoinGroup;
exports.rejectJoinGroup = rejectJoinGroup;
exports.removeMemberGroup = removeMemberGroup;
exports.getPlayerGroups = getPlayerGroups;
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
            let groupRequests = [];
            try {
                const currentRequests = result[0].requests || '[]';
                if (currentRequests === '{}' || currentRequests === '') {
                    groupRequests = [];
                }
                else {
                    groupRequests = JSON.parse(currentRequests);
                }
                if (!Array.isArray(groupRequests)) {
                    throw new Error('Friend requests is not an array');
                }
            }
            catch (error) {
                console.error('Error parsing friendRequests:', error);
                return { success: false, message: "Error parsing join Group requests" };
            }
            if (groupRequests.includes(playerToken)) {
                return { success: false, message: "Join request already sent" };
            }
            groupRequests.push(playerToken);
            yield pool.query('UPDATE `group` SET requests = ? WHERE id = ?', [JSON.stringify(groupRequests), groupID]);
            return { success: true, message: "Group request sent successfully" };
        }
        catch (error) {
            console.error('Error in request join Request:', error);
            return { success: false, message: "Error in request join Request" };
        }
    });
}
function acceptJoinGroup(playerToken, groupID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [result] = yield pool.query('SELECT * FROM `group` WHERE id = ?', [groupID]);
            if (result.length === 0) {
                return { success: false, message: "Group not found" };
            }
            let groupMember = [];
            try {
                const currentRequests = result[0].members || '[]';
                if (currentRequests === '{}' || currentRequests === '') {
                    groupMember = [];
                }
                else {
                    groupMember = JSON.parse(currentRequests);
                }
                if (!Array.isArray(groupMember)) {
                    throw new Error('Group Member is not an array');
                }
            }
            catch (error) {
                console.error('Error parsing Group Member:', error);
                return { success: false, message: "Error parsing join Group" };
            }
            if (groupMember.includes(playerToken)) {
                return { success: false, message: "player is already in this group" };
            }
            groupMember.push(playerToken);
            yield pool.query('UPDATE `group` SET members = ? WHERE id = ?', [JSON.stringify(groupMember), groupID]);
            const deleteRequest = yield rejectJoinGroup(playerToken, groupID);
            try {
                const [player] = yield pool.query('SELECT * FROM players WHERE playerToken = ?', [playerToken]);
                if (player.length === 0) {
                    return { success: false, message: "Player not found" };
                }
                let groupMember = [];
                const currentRequests = player[0].groups || '[]';
                try {
                    if (Array.isArray(currentRequests)) {
                        groupMember = currentRequests;
                    }
                    else if (currentRequests === '{}' || currentRequests === '') {
                        groupMember = [];
                    }
                    else {
                        groupMember = JSON.parse(currentRequests);
                    }
                    if (!Array.isArray(groupMember)) {
                        throw new Error('Group Member is not an array');
                    }
                }
                catch (parseError) {
                    console.error('Error parsing player groups:', parseError, "Current groups:", currentRequests);
                    return { success: false, message: "Error parsing player groups" };
                }
                groupMember.push(groupID);
                yield pool.query('UPDATE players SET `groups` = ? WHERE playerToken = ?', [JSON.stringify(groupMember), playerToken]);
                return { success: true, message: "Group updated for player successfully" };
            }
            catch (error) {
                console.error('Error in updating group for player:', error);
                return { success: false, message: "Error in updating group for player" };
            }
        }
        catch (error) {
            console.error('Error in accept join group Request:', error);
            return { success: false, message: "Error in accept join group Request" };
        }
    });
}
function rejectJoinGroup(playerToken, groupID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [result] = yield pool.query('SELECT requests FROM `group` WHERE id = ?', [groupID]);
            if (result.length === 0) {
                return { success: false, message: "Group not found" };
            }
            let groupRequests = [];
            try {
                const currentRequests = result[0].requests || '[]';
                if (currentRequests === '{}' || currentRequests === '') {
                    groupRequests = [];
                }
                else {
                    groupRequests = JSON.parse(currentRequests);
                }
                if (!Array.isArray(groupRequests)) {
                    throw new Error('Group requests is not an array');
                }
            }
            catch (error) {
                console.error('Error parsing groupRequests:', error);
                return { success: false, message: "Error parsing join group requests" };
            }
            if (!groupRequests.includes(playerToken)) {
                return { success: false, message: "Join request does not exist" };
            }
            groupRequests = groupRequests.filter(request => request !== playerToken);
            yield pool.query('UPDATE `group` SET requests = ? WHERE id = ?', [JSON.stringify(groupRequests), groupID]);
            return { success: true, message: "Reject request processed successfully" };
        }
        catch (error) {
            console.error('Error in reject join group request:', error);
            return { success: false, message: "Error in reject join group request" };
        }
    });
}
function removeMemberGroup(playerToken, groupID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [result] = yield pool.query('SELECT members FROM `group` WHERE id = ?', [groupID]);
            if (result.length === 0) {
                return { success: false, message: "Group not found" };
            }
            let groupMembers = [];
            try {
                const currentMembers = result[0].members || '[]';
                if (currentMembers === '{}' || currentMembers === '') {
                    groupMembers = [];
                }
                else {
                    groupMembers = JSON.parse(currentMembers);
                }
                if (!Array.isArray(groupMembers)) {
                    throw new Error('Group members is not an array');
                }
            }
            catch (error) {
                console.error('Error parsing group members:', error);
                return { success: false, message: "Error parsing group members" };
            }
            if (!groupMembers.includes(playerToken)) {
                return { success: false, message: "Player is not a member of this group" };
            }
            // Remove playerToken from the groupMembers array
            groupMembers = groupMembers.filter(member => member !== playerToken);
            // Update the members field in the database
            yield pool.query('UPDATE `group` SET members = ? WHERE id = ?', [JSON.stringify(groupMembers), groupID]);
            return { success: true, message: "Player removed from group successfully" };
        }
        catch (error) {
            console.error('Error in remove member from group request:', error);
            return { success: false, message: "Error in remove member from group request" };
        }
    });
}
function getPlayerGroups(playerToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [playerResult] = yield pool.query('SELECT `groups` FROM players WHERE playerToken = ?', [playerToken]);
            if (playerResult.length === 0) {
                return { success: false, message: "User not found" };
            }
            let groupIDs = [];
            const currentGroups = playerResult[0].groups || '[]';
            try {
                groupIDs = Array.isArray(currentGroups) ? currentGroups : JSON.parse(currentGroups);
                if (!Array.isArray(groupIDs)) {
                    throw new Error('Groups data is not an array');
                }
            }
            catch (parseError) {
                console.error('Error parsing groups:', parseError, "Current groups:", currentGroups);
                return { success: false, message: "Error parsing player groups" };
            }
            if (groupIDs.length === 0) {
                return { success: true, groups: [] };
            }
            const [groupsResult] = yield pool.query(`SELECT id, name, avatar, description, leader_id, is_private, members FROM \`group\` WHERE id IN (${groupIDs.map(() => '?').join(', ')})`, groupIDs);
            return { success: true, groups: groupsResult };
        }
        catch (error) {
            console.error('Error in fetching player groups:', error);
            return { success: false, message: "Error fetching player groups" };
        }
    });
}
