import { Router, Request, Response } from 'express';
import { getData, completeProfile } from '../DatabaseManager';
import { User } from './user';
import { jwt } from '../utils';
import {debug} from "node:util";
import {generateToken} from "../utils/jwt";

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {

    const player = new User();
    await player.registerUser();

    const token = generateToken(player.playerToken);

    const updatedUser = {
      username: "Guest_" + player.playerToken,
      birthDate: "",
      avatar: 0,
      coin: 150,
      bio: '',
    };

    await completeProfile(player.playerToken, updatedUser);

    res.status(201).json({ success: true, message: 'Player registered successfully', playerToken: player.playerToken, token: token});
  } catch (error) {
    console.error('Error registering player:', error);
    res.status(500).json({ success: false, message: 'Error registering player', error: error });
  }
});

router.post('/completeProfile', jwt.authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { playerToken, username, birthDate, avatar, bio } = req.body;

    if (!username || !playerToken) {
      return res.status(400).json({ success: false, message: 'Missing required fields: username, avatar, playerToken' });
    }

    const user = await getData('playerToken', playerToken);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const updatedUser = {
      username: username || user.username,
      birthDate: new Date(birthDate) || user.birthDate,
      avatar: avatar || user.avatar,
      bio: bio || ''
    };

    const updateResult = await completeProfile(playerToken, updatedUser);

    if (updateResult.success) {
      return res.status(200).json({ success: true, message: 'Profile completed successfully', username: updatedUser.username || "", avatar: updatedUser.avatar || 0, bio: updatedUser.bio || ''});
    } else {
      return res.status(500).json({ success: false, message: 'Failed to update profile' });
    }

  } catch (error) {
    console.error('Error completing player profile:', error);
    res.status(500).json({ success: false, message: 'Error completing player profile', error });
  }
});

export default router; 
