import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';

interface FriendRequestResult {
  success: boolean;
  status?: number;  // Optional
  message?: string; // Optional
}

// Database connection setup
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Hamid87138002?',
  database: 'game_db',
});

export async function addFriendRequest(playerToken: string, friendToken: string): Promise<string> {
  try {
    const [result]: [RowDataPacket[], any] = await pool.query('SELECT friendsRequests FROM players WHERE playerToken = ?', [playerToken]);

    if (result.length === 0) {
      return 'User not found';
    }

    let friendRequests: string[] = [];
    try {
      const currentRequests = result[0].friendsRequests || '[]';

      if (currentRequests === '{}' || currentRequests === '') {
        friendRequests = [];
      } else {
        friendRequests = JSON.parse(currentRequests);
      }

      if (!Array.isArray(friendRequests)) {
        throw new Error('Friend requests is not an array');
      }
    } catch (error) {
      console.error('Error parsing friendRequests:', error);
      return 'Error parsing friend requests';
    }

    if (friendRequests.includes(friendToken)) {
      return 'Friend request already sent';
    }

    friendRequests.push(friendToken);

    await pool.query('UPDATE players SET friendsRequests = ? WHERE playerToken = ?', [JSON.stringify(friendRequests), playerToken]);

    return 'Friend request sent successfully';
  } catch (error) {
    console.error('Error in addFriendRequest:', error);
    return 'Error requesting friend';
  }
}

export async function acceptFriendRequest(playerToken: string, friendToken: string): Promise<FriendRequestResult> {
  try {
    const [user]: [RowDataPacket[], any] = await pool.query(
      'SELECT friendsRequests, friendsList FROM players WHERE playerToken = ?',
      [playerToken]
    );

    if (user.length === 0) {
      return { success: false, status: 404, message: 'User not found' };
    }

    let friendRequests: string[] = JSON.parse(user[0].friendsRequests || '[]');

    let friends: string[] = Array.isArray(JSON.parse(user[0].friendsList))
      ? JSON.parse(user[0].friendsList)
      : [];

    const requestIndex = friendRequests.indexOf(friendToken);
    if (requestIndex === -1) {
      return { success: false, status: 400, message: 'Friend request not found' };
    }

    friendRequests.splice(requestIndex, 1);

    if (!friends.includes(friendToken)) {
      friends.push(friendToken);
    }

    await pool.query(
      'UPDATE players SET friendsRequests = ?, friendsList = ? WHERE playerToken = ?',
      [JSON.stringify(friendRequests), JSON.stringify(friends), playerToken]
    );

    return { success: true };

  } catch (error) {
    console.error('Error accepting friend request:', error);
    return { success: false, status: 500, message: 'Error accepting friend request' };
  }
}

export async function rejectFriendRequest(playerToken: string, friendToken: string): Promise<FriendRequestResult> {
  try {
    const [user]: [RowDataPacket[], any] = await pool.query('SELECT friendsRequests FROM players WHERE playerToken = ?', [playerToken]);

    if (user.length === 0) {
      return { success: false, status: 404, message: 'User not found' };
    }

    let friendRequests: string[] = JSON.parse(user[0].friendsRequests || '[]');

    const requestIndex = friendRequests.indexOf(friendToken);
    if (requestIndex === -1) {
      return { success: false, status: 400, message: 'Friend request not found' };
    }

    friendRequests.splice(requestIndex, 1);

    await pool.query('UPDATE players SET friendsRequests = ? WHERE playerToken = ?',
      [JSON.stringify(friendRequests), playerToken]);

    return { success: true };

  } catch (error) {
    console.error('Error rejecting friend request:', error);
    return { success: false, status: 500, message: 'Error rejecting friend request' };
  }
}

export async function removeFriend(playerToken: string, friendToken: string): Promise<FriendRequestResult> {
  try {
    // Step 1: Fetch the current friends list for the user
    const [user]: [RowDataPacket[], any] = await pool.query('SELECT friendsList FROM players WHERE playerToken = ?', [playerToken]);

    if (user.length === 0) {
      return { success: false, status: 404, message: 'User not found' };
    }

    // Step 2: Parse the current friends list
    let friends: string[] = JSON.parse(user[0].friendsList || '[]');

    // Step 3: Check if the friend exists
    const friendIndex = friends.indexOf(friendToken);
    if (friendIndex === -1) {
      return { success: false, status: 400, message: 'Friend not found in friends list' };
    }

    // Step 4: Remove the friend from the friends list
    friends.splice(friendIndex, 1);

    // Step 5: Update the database with the new friends list
    await pool.query('UPDATE players SET friendsList = ? WHERE playerToken = ?',
      [JSON.stringify(friends), playerToken]);

    return { success: true };

  } catch (error) {
    console.error('Error removing friend:', error);
    return { success: false, status: 500, message: 'Error removing friend' };
  }
}

export async function blockUser(playerToken: string, blockToken: string): Promise<FriendRequestResult> {
  try {
    const [user]: [RowDataPacket[], any] = await pool.query('SELECT blockList FROM players WHERE playerToken = ?', [playerToken]);

    if (user.length === 0) {
      return { success: false, status: 404, message: 'User not found' };
    }

    let blockedUsers: string[] = JSON.parse(user[0].blockedUsers || '[]');

    if (blockedUsers.includes(blockToken)) {
      return { success: false, status: 400, message: 'User already blocked' };
    }

    blockedUsers.push(blockToken);

    await pool.query('UPDATE players SET blockList = ? WHERE playerToken = ?', [JSON.stringify(blockedUsers), playerToken]);

    return { success: true, message: 'User blocked successfully' };
  } catch (error) {
    console.error('Error blocking user:', error);
    return { success: false, status: 500, message: 'Error blocking user' };
  }
}

export async function unblockUser(playerToken: string, unblockToken: string): Promise<FriendRequestResult> {
  try {
    const [user]: [RowDataPacket[], any] = await pool.query('SELECT blockList FROM players WHERE playerToken = ?', [playerToken]);

    if (user.length === 0) {
      return { success: false, status: 404, message: 'User not found' };
    }

    let blockedUsers: string[] = JSON.parse(user[0].blockedUsers || '[]');

    const blockIndex = blockedUsers.indexOf(unblockToken);
    if (blockIndex === -1) {
      return { success: false, status: 400, message: 'User is not blocked' };
    }

    // Remove the user from the blockedUsers list
    blockedUsers.splice(blockIndex, 1);

    await pool.query('UPDATE players SET blockList = ? WHERE playerToken = ?', [JSON.stringify(blockedUsers), playerToken]);

    return { success: true, message: 'User unblocked successfully' };
  } catch (error) {
    console.error('Error unblocking user:', error);
    return { success: false, status: 500, message: 'Error unblocking user' };
  }
}