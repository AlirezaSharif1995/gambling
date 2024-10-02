import { User } from '../Authentication';
import mysql from 'mysql2/promise';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface FriendRequestResult {
  success: boolean;
  status?: number;  // Optional
  message?: string; // Optional
}
// Database connection setup
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Alireza1995!',
  database: 'game_db',
});

export async function registerUser(User: User) {
  try {
    const connection = await pool.getConnection();
    const query = `
          INSERT INTO players (playerToken) 
          VALUES (?)
        `;
    await connection.execute(query, [
      User.playerToken
    ]);
    console.log(`Player ${User.username} saved to the database.`);
    connection.release();
  } catch (error) {
    console.error('Error saving player:', error);
  }
}

export async function completeProfile(playerToken: string, updatedUser: any) {
  try {
    const query = `UPDATE players SET username = ?, birthDate = ?, avatar = ? WHERE playerToken = ?`;

    // Casting result to ResultSetHeader to access affectedRows
    const [result] = await pool.query<ResultSetHeader>(query, [
      updatedUser.username,
      updatedUser.birthDate,
      updatedUser.avatar,
      playerToken
    ]);

    // Check if rows were affected
    return { success: result.affectedRows > 0 };
  } catch (error) {
    console.error('Error updating user data:', error);
    return { success: false };
  }
}

export async function updateData(playerToken: string, type: string, data: any) {
  try {

    // Fetch user from the database by email
    const [rows] = await pool.query('SELECT * FROM players WHERE playerToken = ?', [playerToken]);

    // If no user is found
    if ((rows as any[]).length === 0) {
      return { success: false, message: 'User not found' };
    }

    const query = `UPDATE players SET ${type} = ? WHERE playerToken = ?`;
    const [result] = await pool.query<ResultSetHeader>(query, [data, playerToken]);
    return { success: result.affectedRows > 0 };

  } catch (error) {
    console.error('Error updating user data:', error);
    return { success: false };
  }

}

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
      const [user]: [RowDataPacket[], any] = await pool.query('SELECT friendsRequests, friendsList FROM players WHERE playerToken = ?', [playerToken]);

      if (user.length === 0) {
          return { success: false, status: 404, message: 'User not found' };
      }

      let friendRequests: string[] = JSON.parse(user[0].friendsRequests || '[]');
      let friends: string[] = JSON.parse(user[0].friendsList || '[]'); // Ensure we access the correct column name

      const requestIndex = friendRequests.indexOf(friendToken);
      if (requestIndex === -1) {
          return { success: false, status: 400, message: 'Friend request not found' };
      }

      friendRequests.splice(requestIndex, 1);

      if (!friends.includes(friendToken)) {
          friends.push(friendToken);
      }

      await pool.query('UPDATE players SET friendsRequests = ?, friendsList = ? WHERE playerToken = ?', 
          [JSON.stringify(friendRequests), JSON.stringify(friends), playerToken]);

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
