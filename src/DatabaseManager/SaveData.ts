import { User } from '../Authentication';
import mysql from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';

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

export async function updateData(playerToken: string, updatedUser: any) {
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