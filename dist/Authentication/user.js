"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUser = exports.User = void 0;
const DatabaseManager_1 = require("../DatabaseManager");
class User {
    constructor(username, email, password) {
        this.playerToken = generateToken();
        this.friends = [];
        this.avatar = 0;
        this.region = "global";
        this.role = 1;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    addFriend(playerToken) {
        this.friends.push(playerToken);
    }
    registerUser() {
        (0, DatabaseManager_1.registerUser)(this);
    }
}
exports.User = User;
class AdminUser extends User {
    constructor(adminPermissionLevel, username, email, password) {
        super(username, email, password);
        this.adminPermissionLevel = adminPermissionLevel;
    }
}
exports.AdminUser = AdminUser;
function generateToken() {
    let token = '';
    for (let i = 0; i < 5; i++) {
        token += Math.floor(Math.random() * 10);
    }
    return token;
}
