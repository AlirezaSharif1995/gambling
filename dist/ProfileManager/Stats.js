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
router.post('/updateStats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { playerToken, type, stat } = req.body;
        if (!playerToken) {
            return res.status(400).json({ message: 'Missing required fields: playerToken' });
        }
        const result = yield (0, DatabaseManager_1.updateStats)(playerToken, type, stat);
        if (!result.success) {
            return res.status(404).json({ message: result.message || 'User not found' });
        }
        res.status(200).json({ message: 'Stats updated successfully', success: true });
    }
    catch (error) {
        console.error('Error updating stats:', error);
        res.status(500).json({ message: 'Error updating stats', error });
    }
}));
router.post('/getStats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { playerToken, type } = req.body;
        if (!playerToken) {
            return res.status(400).json({ message: 'Missing required fields: playerToken, type' });
        }
        const result = yield (0, DatabaseManager_1.getData)(type, playerToken);
        res.status(200).json({ [type]: `${result}` });
    }
    catch (error) {
        console.error('Error Add Lose:', error);
        res.status(500).json({ message: 'Error Add Lose:', error: error });
    }
}));
exports.default = router;
