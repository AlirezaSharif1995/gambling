import { registerUser, getData } from '../DatabaseManager';

export class User {

    readonly playerToken: string = generateToken();
    username: string = "";
    email: string = "";
    friends: number[] = [];
    avatar: number = 0;
    region: string = "global";
    protected role: number = 1;
    birthDate: Date = new Date('2000-01-01');

    constructor() {
    }

    addFriend(playerToken: number) {
        this.friends.push(playerToken);
    }

    registerUser() {
        registerUser(this);
    }
}

export class AdminUser extends User {
    adminPermissionLevel: number;

    constructor(adminPermissionLevel: number, username: string, email: string, password: string) {
        super();
        this.adminPermissionLevel = adminPermissionLevel;
    }

}

function generateToken() {
    let token = '';
    for (let i = 0; i < 5; i++) {
        token += Math.floor(Math.random() * 10);
    }
    return token;
}