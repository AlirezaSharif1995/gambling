import { Router, Request, Response } from 'express';
import { addFriendRequest, acceptFriendRequest, rejectFriendRequest, removeFriend, blockUser, unblockUser } from '../DatabaseManager';
const router = Router();

interface FriendRequestResult {
    success: boolean;
    status?: number;  // Optional
    message?: string; // Optional
}

router.post('/addFriend', async (req: Request, res: Response) => {
    const { playerToken, friendToken } = req.body;

    if (!playerToken || !friendToken) {
        return res.status(400).json({ message: 'Missing required fields: playerToken, friendToken' });
    }

    try {
        const result = await addFriendRequest(playerToken, friendToken);
        return res.status(200).json({ message: result });
    } catch (error) {
        console.error('Error in requestAddFriend:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/acceptAddFreind', async (req: Request, res: Response) => {
    const { playerToken, friendToken } = req.body;

    if (!playerToken || !friendToken) {
        return res.status(400).json({ message: 'Missing required fields: playerToken, friendToken' });
    }

    try {
        const result: FriendRequestResult = await acceptFriendRequest(playerToken, friendToken);

        if (result.success) {
            return res.status(200).json({ message: 'Friend request accepted successfully' });
        } else {
            return res.status(result.status || 500).json({ message: result.message || 'Unknown error' });
        }
    } catch (error) {
        console.error('Error accepting friend request:', error);
        res.status(500).json({ message: 'Error accepting friend request', error: error });
    }
});

router.post('/rejectFriend', async (req: Request, res: Response) => {
    const { playerToken, friendToken } = req.body;

    // Validate the required fields
    if (!playerToken || !friendToken) {
        return res.status(400).json({ message: 'Missing required fields: playerToken, friendToken' });
    }

    // Call the function to reject the friend request
    const result = await rejectFriendRequest(playerToken, friendToken);
    if (!result.success) {
        return res.status(result.status || 500).json({ message: result.message });
    }

    res.status(200).json({ message: 'Friend request rejected successfully' });
});

router.post('/removeFreind', async (req: Request, res: Response) => {
    const { playerToken, friendToken } = req.body;

    // Validate the required fields
    if (!playerToken || !friendToken) {
        return res.status(400).json({ message: 'Missing required fields: playerToken, friendToken' });
    }

    // Call the function to remove the friend
    const result = await removeFriend(playerToken, friendToken);
    if (!result.success) {
        return res.status(result.status || 500).json({ message: result.message });
    }

    res.status(200).json({ message: 'Friend removed successfully' });
});

router.post('/blockUser', async (req: Request, res: Response) => {
    const { playerToken, friendToken } = req.body;

    if (!playerToken || !friendToken) {
        return res.status(400).json({ message: 'Missing required fields: playerToken, friendToken' });
    }

    try {
        const result = await blockUser(playerToken, friendToken);
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error('Error blocking user:', error);
        res.status(500).json({ message: 'Error blocking user', error: error });
    }
});

router.post('/unblockUser', async (req: Request, res: Response) => {
    const { playerToken, friendToken } = req.body;

    if (!playerToken || !friendToken) {
        return res.status(400).json({ message: 'Missing required fields: playerToken, friendToken' });
    }

    try {
        const result = await unblockUser(playerToken, friendToken);
        res.status(result.status || 200).json(result);
    } catch (error) {
        console.error('Error unblocking user:', error);
        res.status(500).json({ message: 'Error unblocking user', error: error });
    }
});

export default router; 
