import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alireza1995!',
    database: 'game_db',
});

export async function createGroup(name: string, avatar: string, description: string, leader_id: string, is_private: boolean) {
    try {
        const id = generateToken(); 

        const query = `
            INSERT INTO \`group\` (id, name, avatar, description, leader_id, is_private)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await pool.query(query, [id, name, avatar, description, leader_id, is_private]);

        const [result]: [RowDataPacket[], any] = await pool.query('SELECT `groups` FROM players WHERE playerToken = ?', [leader_id]);

        let groups: string[] = [];
        const currentGroups = result[0]?.groups || '[]'; 

        try {

            if (typeof currentGroups === 'string') {
                groups = JSON.parse(currentGroups);
            } else if (Array.isArray(currentGroups)) {
                groups = currentGroups; // If it's already an array
            }
        } catch (jsonError) {
            console.error('Malformed JSON in currentGroups:', currentGroups, jsonError);
            groups = []; 
        }

        if (groups.includes(id)) {
            return { success: false, message: 'Group already exists' };
        }

        groups.push(id);

        await pool.query('UPDATE players SET `groups` = ? WHERE playerToken = ?', [JSON.stringify(groups), leader_id]);

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
