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
router.post('/createGroup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, avatar, description, playerToken, is_private } = req.body;
    if (!name || !avatar || !description || !playerToken || is_private === undefined || is_private === null) {
        return res.status(400).json({ message: 'Missing required fields: name, avatar, description, playerToken, is_private' });
    }
    try {
        const result = (0, DatabaseManager_1.createGroup)(name, avatar, description, playerToken, is_private);
        return res.status(200).json({ message: 'Group created successfully', id: (yield result).id });
    }
    catch (error) {
        console.error('Error Creating Group:', error);
        res.status(500).json({ message: 'Error Creating Group:', error });
    }
}));
router.post('/getGroupInfo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { groupID } = req.body;
        if (!groupID) {
            return res.status(400).json({ message: 'Missing required fields: groupID' });
        }
        const result = yield (0, DatabaseManager_1.getGroupData)(groupID);
        return res.status(200).json(result);
    }
    catch (error) {
        console.error('Error Get Group Info:', error);
        res.status(500).json({ message: 'Error Get Group Info:', error });
    }
}));
exports.default = router;
