import { User } from '../Authentication';
import mysql from 'mysql2/promise';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Database connection setup
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Hamid87138002?',
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
    const query = `UPDATE players SET username = ?, birthDate = ?, avatar = ?, bio = ?, coins = ? WHERE playerToken = ?`;

    // Casting result to ResultSetHeader to access affectedRows
    const [result] = await pool.query<ResultSetHeader>(query, [
      updatedUser.username || 'Guest',
      updatedUser.birthDate || '',
      updatedUser.avatar || 0,
      updatedUser.bio || '',
      updatedUser.coin || 0,
      playerToken
    ]);

    console.log(updatedUser.username)
    console.log(updatedUser.birthDate)
    console.log(updatedUser.avatar)
    console.log(updatedUser.bio)
    console.log(updatedUser.coin)
    console.log(playerToken)

    console.log(result)

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
