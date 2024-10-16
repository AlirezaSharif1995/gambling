import { Router, Request, Response } from 'express';
import { createGroup, getGroupData } from '../DatabaseManager'
const router = Router();

router.post('/createGroup', async (req: Request, res: Response) => {

    const { name, avatar, description, playerToken, is_private } = req.body;

    if (!name || !avatar || !description || !playerToken || is_private === undefined || is_private === null) {
        return res.status(400).json({ message: 'Missing required fields: name, avatar, description, playerToken, is_private' });
    }

    try {

        const result = createGroup(name, avatar, description, playerToken, is_private);
        return res.status(200).json({ message: 'Group created successfully', id: (await result).id });

    } catch (error) {
        console.error('Error Creating Group:', error);
        res.status(500).json({ message: 'Error Creating Group:', error });
    }


});

router.post('/getGroupInfo', async (req: Request, res: Response) => {

    try {
        const { groupID } = req.body;
        if (!groupID) {
            return res.status(400).json({ message: 'Missing required fields: groupID' });
        }
        const result = await getGroupData(groupID);
        return res.status(200).json(result);

    } catch (error) {

        console.error('Error Get Group Info:', error);
        res.status(500).json({ message: 'Error Get Group Info:', error });
    }

});

router.post('/recommendedGroup', async (req: Request, res: Response) => {

});

export default router; 
