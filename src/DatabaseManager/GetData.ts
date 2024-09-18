import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt'; // Assuming you have a generateToken utility function

// Database connection setup
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alireza1995!',
    database: 'game_db',
});

export async function loginUser(email: string, password: string) {
    try {
        // Fetch user from the database by email
        const [rows] = await pool.query('SELECT * FROM players WHERE email = ?', [email]);

        // If no user is found
        if ((rows as any[]).length === 0) {
            return { success: false, message: 'User not found' };
        }

        const user = (rows as any[])[0]; // Access the first row (the user)

        // Compare the password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return { success: false, message: 'Invalid password' };
        }

        // Generate a JWT token
        const token = generateToken(user.id); // Assuming user.id is the identifier

        return { success: true, message: 'Login successful', token };
    } catch (error) {
        console.error('Error logging in user:', error);
        return { success: false, message: 'Error logging in user: ' + error };
    }
}
