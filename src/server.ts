import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as Auth from './Authentication'; // Import from index.ts
import { jwt } from './utils';
import * as FriendsManager from './FriendsManager';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use('/register', Auth.registerRoutes);
app.use('/login', Auth.loginRoutes);
app.use('/friendsManager', jwt.authenticateJWT, FriendsManager.updateFreindsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
