import mysql from 'mysql2/promise';
import { ResultSetHeader, RowDataPacket } from 'mysql2'; // Import necessary types

type StatType = 'winCount' | 'loseCount';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Alireza1995!',
  database: 'game_db',
});

export async function updateStats(playerToken: string, type: StatType, stat: number) {
  try {
    // Properly typing the query result
    const [rows]: [RowDataPacket[], any] = await pool.query(
      'SELECT * FROM players WHERE playerToken = ?',
      [playerToken]
    );

    if (rows.length === 0) {
      return { success: false, message: 'User not found' };
    }

    // Use the correct type to access the stat
    const currentStat = (rows[0] as any)[type] || 0; // Type assertion for accessing dynamic key
    const updatedPoint = currentStat + stat;

    const query = `UPDATE players SET ${type} = ? WHERE playerToken = ?`;
    const [result] = await pool.query<ResultSetHeader>(query, [updatedPoint, playerToken]);
    return { success: result.affectedRows > 0 };

  } catch (error) {
    console.error('Error updating user data:', error);
    return { success: false };
  }
}
