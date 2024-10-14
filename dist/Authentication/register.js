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
const user_1 = require("./user");
const utils_1 = require("../utils");
const jwt_1 = require("../utils/jwt");
const router = (0, express_1.Router)();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = new user_1.User();
        yield player.registerUser();
        const token = (0, jwt_1.generateToken)(player.playerToken);
        const updatedUser = {
            username: "Guest_" + player.playerToken,
            birthDate: "",
            avatar: 0,
            coin: 150,
            bio: '',
        };
        yield (0, DatabaseManager_1.completeProfile)(player.playerToken, updatedUser);
        res.status(201).json({ success: true, message: 'Player registered successfully', playerToken: player.playerToken, token: token });
    }
    catch (error) {
        console.error('Error registering player:', error);
        res.status(500).json({ success: false, message: 'Error registering player', error: error });
    }
}));
router.post('/completeProfile', utils_1.jwt.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { playerToken, username, birthDate, avatar, bio, country } = req.body;
        if (!username || !playerToken) {
            return res.status(400).json({ success: false, message: 'Missing required fields: username, avatar, playerToken' });
        }
        const user = yield (0, DatabaseManager_1.getData)('playerToken', playerToken);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const updatedUser = {
            username: username || user.username,
            birthDate: new Date(birthDate) || user.birthDate,
            avatar: avatar || user.avatar,
            bio: bio || '',
            country: country || ''
        };
        const updateResult = yield (0, DatabaseManager_1.completeProfile)(playerToken, updatedUser);
        if (updateResult.success) {
            return res.status(200).json({ success: true, message: 'Profile completed successfully', username: updatedUser.username || "", avatar: updatedUser.avatar || 0, bio: updatedUser.bio || '' });
        }
        else {
            return res.status(500).json({ success: false, message: 'Failed to update profile' });
        }
    }
    catch (error) {
        console.error('Error completing player profile:', error);
        res.status(500).json({ success: false, message: 'Error completing player profile', error });
    }
}));
exports.default = router;
