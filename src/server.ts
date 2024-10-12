import express from 'express';
import { jwt } from './utils';
import bodyParser from 'body-parser';
import * as Auth from './Authentication'; // Import from index.ts
import * as FriendsManager from './FriendsManager';
import * as Profile from './ProfileManager';
import * as Group from './Groups';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use('/register', Auth.registerRoutes);
app.use('/login', Auth.loginRoutes);
app.use('/friendsManager', jwt.authenticateJWT, FriendsManager.updateFreindsRoutes);
app.use('/statsManager', jwt.authenticateJWT, Profile.updateStats);
app.use('/profileManager', jwt.authenticateJWT, Profile.updateProfile);
app.use('/gameManager', jwt.authenticateJWT, Profile.gameManager);
app.use('/playerInfo', jwt.authenticateJWT, Profile.playerInfo);
app.use('/groupManager', jwt.authenticateJWT, Group.groupManager);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
