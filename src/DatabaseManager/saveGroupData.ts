import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alireza1995!',
    database: 'game_db',
});

export async function createGroup(name: string, avatar: string, description: string, leader_id: number, is_private: boolean) {
    try {
        const id = generateToken(); // Make sure generateToken creates a unique ID
        
        const query = `
            INSERT INTO \`group\` (id, name, avatar_url, description, leader_id, is_private)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        await pool.query(query, [id, name, avatar, description, leader_id, is_private]);

        return { success: true, message: 'Group created successfully', id };

    } catch (error) {
        console.error('Error Creating Group:', error);
        return { success: false, message: 'Error Creating Group', error };
    }
}



function generateToken() {
    let token = '';
    for (let i = 0; i < 5; i++) {
        token += Math.floor(Math.random() * 10);
    }
    return token;
}
