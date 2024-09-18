import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from './user'; 

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields: username, email, password' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const player = new User(username, email, hashedPassword);
    await player.registerUser();

    res.status(201).json({ message: 'Player registered successfully', playerToken: player.playerToken });
  } catch (error) {
    console.error('Error registering player:', error); 
    res.status(500).json({ message: 'Error registering player', error: error });
  }
});

export default router; 
