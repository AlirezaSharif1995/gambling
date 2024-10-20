import { Router, Request, Response } from 'express';
import { getPlayerData, getGameByPlayerToken } from '../DatabaseManager';

const router = Router();

router.post('/', async (req: Request, res: Response) => {

    try {
        const { userToken }: { userToken: string } = req.body;

        if (!userToken) {
            return res.status(400).json({ message: 'Missing required fields: playerToken, type' });
        }

        const result = await getPlayerData(userToken);
        res.status(200).json(result);

    } catch (error) {
        console.error('Error Get Player Info:', error);
        res.status(500).json({ message: 'Error Get Player Info:', error: error });
    }
});

router.post('/games', async (req: Request, res: Response) => {

    try {
        const { playerToken }: { playerToken: string } = req.body;

        if (!playerToken) {
            return res.status(400).json({ message: 'Missing required fields: playerToken, type' });
        }

        const result = await getGameByPlayerToken(playerToken);
        res.status(200).json(result);

    } catch (error) {
        console.error('Error Get Player Info:', error);
        res.status(500).json({ message: 'Error Get Player Info:', error: error });
    }
});


export default router; 