import { Router, Request, Response } from 'express';
import { updateStats, getData } from '../DatabaseManager';

const router = Router();

router.post('/updateStats', async (req: Request, res: Response) => {
    
});

export default router; 