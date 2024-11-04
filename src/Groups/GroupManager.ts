import { Router, Request, Response } from 'express';
import * as Database from '../DatabaseManager'
const router = Router();

router.post('/createGroup', async (req: Request, res: Response) => {

    const { name, avatar, description, playerToken, is_private, members } = req.body;

    if (!name || !description || !playerToken) {
        return res.status(400).json({ success: false, message: 'Missing required fields: name, avatar, description, playerToken, is_private' });
    }

    try {

        const result = Database.createGroup(name, avatar, description, playerToken, is_private, members);
        return res.status(200).json({ success: true, message: 'Group created successfully', id: (await result).id });

    } catch (error) {
        console.error('Error Creating Group:', error);
        res.status(500).json({ success: false, message: 'Error Creating Group:', error });
    }
});

router.post('/getGroupInfo', async (req: Request, res: Response) => {

    try {
        const { groupID } = req.body;
        if (!groupID) {
            return res.status(400).json({ message: 'Missing required fields: groupID' });
        }
        const result = await Database.getGroupData(groupID);
        return res.status(200).json(result);

    } catch (error) {

        console.error('Error Get Group Info:', error);
        res.status(500).json({ message: 'Error Get Group Info:', error });
    }

});

router.post('/requestJoinGroup', async (req: Request, res: Response) => {

    try {
        const { playerToken, groupID } = req.body;
        if (!groupID || !playerToken) {
            return res.status(400).json({ success: false, message: 'Missing required fields: groupID, playerToken' });
        }
        const result = await Database.requestJoinGroup(playerToken, groupID);
        return res.status(200).json(result);

    } catch (error) {

        console.error('Error request Join Group:', error);
        res.status(500).json({ success: false, message: 'Error request Join Group:', error });
    }

});

router.post('/acceptRequest', async (req: Request, res: Response) => {

    try {
        const { userToken, groupID } = req.body;
        if (!groupID || !userToken) {
            return res.status(400).json({ success: false, message: 'Missing required fields: groupID, userToken' });
        }

        const result = await Database.acceptJoinGroup(userToken, groupID);
        return res.status(200).json(result);

    } catch (error) {

        console.error('Error accept Request:', error);
        res.status(500).json({ success: false, message: 'Error accept Request:', error });
    }

});

router.post('/rejectRequest', async (req: Request, res: Response) => {

    try {
        const { userToken, groupID } = req.body;
        if (!groupID || !userToken) {
            return res.status(400).json({ success: false, message: 'Missing required fields: groupID, userToken' });
        }

        const result = await Database.rejectJoinGroup(userToken, groupID);
        return res.status(200).json(result);

    } catch (error) {

        console.error('Error reject Request:', error);
        res.status(500).json({ success: false, message: 'Error reject Request:', error });
    }
});

router.post('/removeMember', async (req: Request, res: Response) => {

    try {
        const { userToken, groupID } = req.body;
        if (!groupID || !userToken) {
            return res.status(400).json({ success: false, message: 'Missing required fields: groupID, userToken' });
        }

        const result = await Database.removeMemberGroup(userToken, groupID);
        return res.status(200).json(result);

    } catch (error) {

        console.error('Error remove Member:', error);
        res.status(500).json({ success: false, message: 'Error remove Member:', error });
    }
});

router.post('/inviteMember', async (req: Request, res: Response) => {

});

router.post('/unlockInviteMember', async (req: Request, res: Response) => {

});

router.post('/getPlayerGroups', async (req: Request, res: Response) => {

try {
        const { playerToken } = req.body;
        if (!playerToken) {
            return res.status(400).json({ success: false, message: 'Missing required fields: groupID, userToken' });
        }

        const result = await Database.getPlayerGroups(playerToken);
        return res.status(200).json(result);

    } catch (error) {

        console.error('Error get Player Groups:', error);
        res.status(500).json({ success: false, message: 'Error get Player Groups:', error });
    }

});

export default router; 
