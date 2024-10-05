import mysql from 'mysql2/promise';
import { generateToken } from '../utils/jwt';
import { RowDataPacket } from 'mysql2'; 

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alireza1995!',
    database: 'game_db',
});

export async function loginUser(playerToken:string) {
    try {
        // Fetch user from the database by email
        const [rows] = await pool.query('SELECT * FROM players WHERE playerToken = ?', [playerToken]);

        // If no user is found
        if ((rows as any[]).length === 0) {
            return { success: false, message: 'User not found' };
        }

        const user = (rows as any[])[0]; // Access the first row (the user)

        // Generate a JWT token
        const token = generateToken(playerToken); // Assuming user.id is the identifier

        return { success: true, message: 'Login successful', token };
    } catch (error) {
        console.error('Error logging in user:', error);
        return { success: false, message: 'Error logging in user: ' + error };
    }
}

export async function getData(type: string, playerToken: string) {
    try {
        const query = `SELECT * FROM players WHERE playerToken = ?`;
        const [rows] = await pool.query<RowDataPacket[]>(query, [playerToken]);

        if (rows.length > 0 && rows[0].hasOwnProperty(type)) {
            return rows[0][type];
        } else {
            return { success: false, message: `Property '${type}' not found in the result.` };
        }

    } catch (error) {
        console.error('Error get data:', error);
        return { success: false, message: 'Error get data: ' + error };
    }
}

