import { Router, Request, Response } from 'express';
import { getPlayerData } from '../DatabaseManager';

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


export default router; 