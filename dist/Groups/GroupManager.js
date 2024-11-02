"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Database = __importStar(require("../DatabaseManager"));
const router = (0, express_1.Router)();
router.post('/createGroup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, avatar, description, playerToken, is_private } = req.body;
    if (!name || !avatar || !description || !playerToken || is_private === undefined || is_private === null) {
        return res.status(400).json({ message: 'Missing required fields: name, avatar, description, playerToken, is_private' });
    }
    try {
        const result = Database.createGroup(name, avatar, description, playerToken, is_private);
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
        const result = yield Database.getGroupData(groupID);
        return res.status(200).json(result);
    }
    catch (error) {
        console.error('Error Get Group Info:', error);
        res.status(500).json({ message: 'Error Get Group Info:', error });
    }
}));
router.post('/recommendedGroup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
router.post('/requestJoinGroup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { playerToken, groupID } = req.body;
        if (!groupID || !playerToken) {
            return res.status(400).json({ success: false, message: 'Missing required fields: groupID, playerToken' });
        }
        const result = yield Database.requestJoinGroup(playerToken, groupID);
        return res.status(200).json(result);
    }
    catch (error) {
        console.error('Error request Join Group:', error);
        res.status(500).json({ success: false, message: 'Error request Join Group:', error });
    }
}));
router.post('/acceptRequest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userToken, groupID } = req.body;
        if (!groupID || !userToken) {
            return res.status(400).json({ success: false, message: 'Missing required fields: groupID, userToken' });
        }
        const result = yield Database.acceptJoinGroup(userToken, groupID);
        return res.status(200).json(result);
    }
    catch (error) {
        console.error('Error accept Request:', error);
        res.status(500).json({ success: false, message: 'Error accept Request:', error });
    }
}));
router.post('/rejectRequest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userToken, groupID } = req.body;
        if (!groupID || !userToken) {
            return res.status(400).json({ success: false, message: 'Missing required fields: groupID, userToken' });
        }
        const result = yield Database.rejectJoinGroup(userToken, groupID);
        return res.status(200).json(result);
    }
    catch (error) {
        console.error('Error reject Request:', error);
        res.status(500).json({ success: false, message: 'Error reject Request:', error });
    }
}));
router.post('/removeMember', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userToken, groupID } = req.body;
        if (!groupID || !userToken) {
            return res.status(400).json({ success: false, message: 'Missing required fields: groupID, userToken' });
        }
        const result = yield Database.removeMemberGroup(userToken, groupID);
        return res.status(200).json(result);
    }
    catch (error) {
        console.error('Error remove Member:', error);
        res.status(500).json({ success: false, message: 'Error remove Member:', error });
    }
}));
router.post('/inviteMember', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
router.post('/unlockInviteMember', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.default = router;
