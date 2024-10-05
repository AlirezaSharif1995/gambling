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
router.post('/updateProfile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerToken, type, data } = req.body;
    if (!type || !data || !playerToken) {
        return res.status(400).json({ message: 'Missing required fields: data, playerToken, type' });
    }
    try {
        const result = (0, DatabaseManager_1.updateProfile)(playerToken, type, data);
        res.status(200).json({ message: 'Profile updated successfully' });
    }
    catch (error) {
        console.error('Error updating Profile:', error);
        res.status(500).json({ message: 'Error updating Profile', error });
    }
}));
exports.default = router;
