import { Router, Request, Response } from 'express';
import { getGameByPlayerToken } from '../DatabaseManager';

const router = Router();

router.post('/getGamesByPlayerToken', async (req: Request, res: Response) => {

    try {
        const { playerToken }: { playerToken: string } = req.body;

        if (!playerToken) {
            return res.status(400).json({ message: 'Missing required fields: playerToken, type' });
        }

        const result = await getGameByPlayerToken(playerToken);
        res.status(200).json(result);


    } catch (error) {
        console.error('Error Get Games By Player Token:', error);
        res.status(500).json({ message: 'Error Get Games By Player Token:', error: error });
    }

});

export default router; 