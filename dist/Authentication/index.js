"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.loginRoutes = exports.registerRoutes = void 0;
var register_1 = require("./register");
Object.defineProperty(exports, "registerRoutes", { enumerable: true, get: function () { return __importDefault(register_1).default; } });
var login_1 = require("./login");
Object.defineProperty(exports, "loginRoutes", { enumerable: true, get: function () { return __importDefault(login_1).default; } });
var user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
