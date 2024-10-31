import { Router, Request, Response } from 'express';
import { createGroup, getGroupData, requestJoinGroup } from '../DatabaseManager'
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

router.post('/requestJoinGroup', async (req: Request, res: Response) => {

    try {
        const { playerToken, groupID } = req.body;
        if (!groupID || !playerToken) {
            return res.status(400).json({ success: false, message: 'Missing required fields: groupID, playerToken' });
        }
        const result = await requestJoinGroup(playerToken, groupID);
        return res.status(200).json(result);

    } catch (error) {

        console.error('Error Get Group Info:', error);
        res.status(500).json({ success: false, message: 'Error Get Group Info:', error });
    }

});

router.post('/acceptRequest', async (req: Request, res: Response) => {

});

router.post('/rejectRequest', async (req: Request, res: Response) => {

});

router.post('/removeMember', async (req: Request, res: Response) => {

});

router.post('/inviteMember', async (req: Request, res: Response) => {

});

router.post('/removeMember', async (req: Request, res: Response) => {

});

router.post('/unlockInviteMember', async (req: Request, res: Response) => {

});

export default router; 
