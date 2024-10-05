import { Router, Request, Response } from 'express';
import { updateProfile } from '../DatabaseManager';

const router = Router();

router.post('/updateProfile', async (req: Request, res: Response) => {

    const { playerToken, type, data } = req.body;

    if (!type || !data || !playerToken) {
        return res.status(400).json({ message: 'Missing required fields: data, playerToken, type' });
    }

    try {

        const result = updateProfile(playerToken, type, data);
        res.status(200).json({ message: 'Profile updated successfully' });

    } catch (error) {
        console.error('Error updating Profile:', error);
        res.status(500).json({ message: 'Error updating Profile', error });
    }
});

export default router; 