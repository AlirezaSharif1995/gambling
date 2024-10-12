"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerInfo = exports.gameManager = exports.updateProfile = exports.updateStats = void 0;
var Stats_1 = require("./Stats");
Object.defineProperty(exports, "updateStats", { enumerable: true, get: function () { return __importDefault(Stats_1).default; } });
var updateProfile_1 = require("./updateProfile");
Object.defineProperty(exports, "updateProfile", { enumerable: true, get: function () { return __importDefault(updateProfile_1).default; } });
var gameManager_1 = require("./gameManager");
Object.defineProperty(exports, "gameManager", { enumerable: true, get: function () { return __importDefault(gameManager_1).default; } });
var playersInfo_1 = require("./playersInfo");
Object.defineProperty(exports, "playerInfo", { enumerable: true, get: function () { return __importDefault(playersInfo_1).default; } });
