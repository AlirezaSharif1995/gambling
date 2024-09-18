import { User } from '../Authentication';
import mysql from 'mysql2/promise';

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
          INSERT INTO players (playerToken, username, email, password) 
          VALUES (?, ?, ?, ?)
        `;
        await connection.execute(query, [
            User.playerToken,
            User.username,
            User.email,
            User.password,
        ]);
        console.log(`Player ${User.username} saved to the database.`);
        connection.release();
    } catch (error) {
        console.error('Error saving player:', error);
    }
}
