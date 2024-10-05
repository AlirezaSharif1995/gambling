import { Router, Request, Response } from 'express';
import { updateStats, getData } from '../DatabaseManager';

const router = Router();

type StatType = 'winCount' | 'loseCount';

router.post('/updateStats', async (req: Request, res: Response) => {
    try {
        const { playerToken, type, stat }: { playerToken: string; type: StatType; stat: number } = req.body;

        if (!playerToken) {
            return res.status(400).json({ message: 'Missing required fields: playerToken' });
        }

        const result = await updateStats(playerToken, type, stat);

        if (!result.success) {
            return res.status(404).json({ message: result.message || 'User not found' });
        }

        res.status(200).json({ message: 'Stats updated successfully', success: true });

    } catch (error) {
        console.error('Error updating stats:', error);
        res.status(500).json({ message: 'Error updating stats', error });
    }
});

router.post('/getStats', async (req: Request, res: Response) => {

    try {
        const { playerToken, type }: { playerToken: string; type: StatType; } = req.body;

        if (!playerToken) {
            return res.status(400).json({ message: 'Missing required fields: playerToken, type' });
        }
        const result = await getData(type, playerToken);

        res.status(200).json({ [type]: `${result}` });

    } catch (error) {
        console.error('Error Add Lose:', error);
        res.status(500).json({ message: 'Error Add Lose:', error: error });
    }

});

export default router; 