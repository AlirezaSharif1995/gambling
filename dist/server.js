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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const body_parser_1 = __importDefault(require("body-parser"));
const Auth = __importStar(require("./Authentication")); // Import from index.ts
const FriendsManager = __importStar(require("./FriendsManager"));
const Profile = __importStar(require("./ProfileManager"));
const Group = __importStar(require("./Groups"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/register', Auth.registerRoutes);
app.use('/login', Auth.loginRoutes);
app.use('/friendsManager', utils_1.jwt.authenticateJWT, FriendsManager.updateFreindsRoutes);
app.use('/statsManager', utils_1.jwt.authenticateJWT, Profile.updateStats);
app.use('/profileManager', utils_1.jwt.authenticateJWT, Profile.updateProfile);
app.use('/groupManager', utils_1.jwt.authenticateJWT, Group.groupManager);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
