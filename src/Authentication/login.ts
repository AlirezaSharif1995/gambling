
import { Router, Request, Response } from 'express';
import { loginUser } from '../DatabaseManager';

const router = Router();


router.post('/', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields: email, password' });
        }
        const result = await loginUser(email, password);
        console.log(result);
        res.status(201).json({ result });

    } catch (error) {
        console.error('Error login player:', error);
        res.status(500).json({ message: 'Error login player', error: error });
    }
});

export default router; 