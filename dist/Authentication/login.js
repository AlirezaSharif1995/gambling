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
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { playerToken } = req.body;
        if (!playerToken) {
            return res.status(400).json({ message: 'Missing required fields: playerToken' });
        }
        const result = yield (0, DatabaseManager_1.loginUser)(playerToken);
        res.status(201).json({ result });
    }
    catch (error) {
        console.error('Error login player:', error);
        res.status(500).json({ message: 'Error login player', error: error });
    }
}));
exports.default = router;
