import { Router, Request, Response } from 'express';
import { loginUser } from '../DatabaseManager';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const { playerToken } = req.body;

        if (!playerToken) {
            return res.status(400).json({ success: true, message: 'Missing required fields: playerToken' });
        }

        const result = await loginUser(playerToken);
        res.status(201).json(result);

    } catch (error) {
        console.error('Error login player:', error);
        res.status(500).json({ success: false, message: 'Error login player', error: error });
    }
});

export default router;