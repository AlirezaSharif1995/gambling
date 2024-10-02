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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DatabaseManager_1 = require("../DatabaseManager");
const router = (0, express_1.Router)();
router.post('/addFriend', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerToken, friendToken } = req.body;
    if (!playerToken || !friendToken) {
        return res.status(400).json({ message: 'Missing required fields: playerToken, friendToken' });
    }
    try {
        const result = yield (0, DatabaseManager_1.addFriendRequest)(playerToken, friendToken);
        return res.status(200).json({ message: result });
    }
    catch (error) {
        console.error('Error in requestAddFriend:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
router.post('/acceptAddFreind', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerToken, friendToken } = req.body;
    if (!playerToken || !friendToken) {
        return res.status(400).json({ message: 'Missing required fields: playerToken, friendToken' });
    }
    try {
        const result = yield (0, DatabaseManager_1.acceptFriendRequest)(playerToken, friendToken);
        if (result.success) {
            return res.status(200).json({ message: 'Friend request accepted successfully' });
        }
        else {
            return res.status(result.status || 500).json({ message: result.message || 'Unknown error' });
        }
    }
    catch (error) {
        console.error('Error accepting friend request:', error);
        res.status(500).json({ message: 'Error accepting friend request', error: error });
    }
}));
router.post('/rejectFriend', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerToken, friendToken } = req.body;
    // Validate the required fields
    if (!playerToken || !friendToken) {
        return res.status(400).json({ message: 'Missing required fields: playerToken, friendToken' });
    }
    // Call the function to reject the friend request
    const result = yield (0, DatabaseManager_1.rejectFriendRequest)(playerToken, friendToken);
    if (!result.success) {
        return res.status(result.status || 500).json({ message: result.message });
    }
    res.status(200).json({ message: 'Friend request rejected successfully' });
}));
router.post('/removeFreind', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerToken, friendToken } = req.body;
    // Validate the required fields
    if (!playerToken || !friendToken) {
        return res.status(400).json({ message: 'Missing required fields: playerToken, friendToken' });
    }
    // Call the function to remove the friend
    const result = yield (0, DatabaseManager_1.removeFriend)(playerToken, friendToken);
    if (!result.success) {
        return res.status(result.status || 500).json({ message: result.message });
    }
    res.status(200).json({ message: 'Friend removed successfully' });
}));
exports.default = router;
