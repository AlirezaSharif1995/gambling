import { Router, Request, Response } from 'express';
import { getData, updateData } from '../DatabaseManager';
import { User } from './user';
import { jwt } from '../utils';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {

    const player = new User();
    await player.registerUser();

    res.status(201).json({ message: 'Player registered successfully', playerToken: player.playerToken });
  } catch (error) {
    console.error('Error registering player:', error);
    res.status(500).json({ message: 'Error registering player', error: error });
  }
});

router.post('/completeProfile', jwt.authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { playerToken, username, birthDate, avatar } = req.body;

    if (!username || !birthDate || !avatar || !playerToken) {
      return res.status(400).json({ message: 'Missing required fields: username, birthDate, avatar, playerToken' });
    }

    const user = await getData('playerToken', playerToken);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = {
      username: username || user.username,
      birthDate: new Date(birthDate) || user.birthDate,
      avatar: avatar || user.avatar,
    };

    const updateResult = await updateData(playerToken, updatedUser);

    if (updateResult.success) {
      return res.status(200).json({ message: 'Profile completed successfully', user: updatedUser });
    } else {
      return res.status(500).json({ message: 'Failed to update profile' });
    }

  } catch (error) {
    console.error('Error completing player profile:', error);
    res.status(500).json({ message: 'Error completing player profile', error });
  }
});

export default router; 
