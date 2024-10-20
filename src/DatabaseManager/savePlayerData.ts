import mysql from 'mysql2/promise';
import { ResultSetHeader, RowDataPacket } from 'mysql2'; // Import necessary types

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Hamid87138002?',
    database: 'game_db',
});

export async function updateProfile(playerToken: string, type: string, data: string | number) {
    try {
        // Properly typing the query result
        const [rows]: [RowDataPacket[], any] = await pool.query(
            'SELECT * FROM players WHERE playerToken = ?',
            [playerToken]
        );

        if (rows.length === 0) {
            return { success: false, message: 'User not found' };
        }

        const query = `UPDATE players SET ${[type]} = ? WHERE playerToken = ?`;
        const [result] = await pool.query<ResultSetHeader>(query, [data, playerToken]);
        return { success: result.affectedRows > 0 };

    } catch (error) {
        console.error('Error updating user data:', error);
        return { success: false };
    }
}