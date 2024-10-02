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
const router = (0, express_1.Router)();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = new user_1.User();
        yield player.registerUser();
        res.status(201).json({ message: 'Player registered successfully', playerToken: player.playerToken });
    }
    catch (error) {
        console.error('Error registering player:', error);
        res.status(500).json({ message: 'Error registering player', error: error });
    }
}));
router.post('/completeProfile', utils_1.jwt.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { playerToken, username, birthDate, avatar } = req.body;
        if (!username || !birthDate || !avatar || !playerToken) {
            return res.status(400).json({ message: 'Missing required fields: username, birthDate, avatar, playerToken' });
        }
        const user = yield (0, DatabaseManager_1.getData)('playerToken', playerToken);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedUser = {
            username: username || user.username,
            birthDate: new Date(birthDate) || user.birthDate,
            avatar: avatar || user.avatar,
        };
        const updateResult = yield (0, DatabaseManager_1.updateData)(playerToken, updatedUser);
        if (updateResult.success) {
            return res.status(200).json({ message: 'Profile completed successfully', user: updatedUser });
        }
        else {
            return res.status(500).json({ message: 'Failed to update profile' });
        }
    }
    catch (error) {
        console.error('Error completing player profile:', error);
        res.status(500).json({ message: 'Error completing player profile', error });
    }
}));
exports.default = router;
