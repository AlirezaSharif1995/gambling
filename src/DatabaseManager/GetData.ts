import mysql from 'mysql2/promise';
import { generateToken } from '../utils/jwt';
import { RowDataPacket, FieldPacket } from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alireza1995!',
    database: 'game_db',
});

const notValidRequest = ['playerToken'];

export async function loginUser(playerToken: string) {
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

        const playerData =
        {
            username : user.username,
            avatar : user.avatar
        }

        return { success: true, message: 'Login successful', token};
    } catch (error) {
        console.error('Error logging in user:', error);
        return { success: false, message: 'Error logging in user: ' + error };
    }
}

export async function getData(type: string, playerToken: string) {
    try {

        if (notValidRequest.includes(type)) {

            return { success: false, message: `The input "${type}" is not valid.` };
        }

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

export async function getGameByPlayerToken(playerToken: string) {

    try {
        const query = `
          SELECT * FROM game_results 
          WHERE player1_id = ? OR player2_id = ?
        `;

        const [rows, fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(query, [playerToken, playerToken]);

        if (rows.length === 0) {
            return { success: true, message: 'No game results found for this player', data:"" };
        }

        // Get opponent information using getPlayerData
        const gamesWithOpponentData = await Promise.all(
            rows.map(async (game) => {
                const opponentId = game.player1_id === playerToken ? game.player2_id : game.player1_id;
                const opponentData = await getPlayerData(opponentId);

                if (!opponentData) {
                    return { success: false, message: 'Opponent not found' };
                }

                return {
                    ...game,
                    opponentName: opponentData.username,
                    opponentAvatar: opponentData.avatar
                };
            })
        );

        return { success: true, data: gamesWithOpponentData };

    } catch (error) {
        console.error('Error fetching game results by player ID:', error);
        return { success: false, message: 'Failed to retrieve game results' };
    }
}

export async function getPlayerData(playerToken: string) {

    try {

        const query = `
            SELECT winCount, loseCount, coins, avatar, username, bio, country,birthDate \`groups\` 
            FROM players 
            WHERE playerToken = ?
        `;

        const [rows, fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(query, [playerToken]);

        if (rows.length === 0) {
            return { success: false, message: 'Player not found' };
        }

        return { success: true, username: rows[0].username, avatar: rows[0].avatar, winCount: rows[0].winCount, loseCount: rows[0].loseCount, coin: rows[0].coins, bio: rows[0].bio || '', country: rows[0].country, birthdate: rows[0].birthDate};

    } catch (error) {
        console.error('Error fetching player data:', error);
        return { success: false, message: 'Failed to retrieve player data' };
    }

}

export async function getGroupData(groupID: string) {
    try {
        const query = `
            SELECT name, avatar, description, leader_id, is_private, members FROM \`group\`
            WHERE id = ?
        `;

        const [rows, fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(query, [groupID]);

        if (rows.length === 0) {
            return { success: false, message: 'Group not found' };
        }

        return { success: true, data: rows[0] };

    } catch (error) {
        console.error('Error fetching Group data:', error);
        return { success: false, message: 'Failed to retrieve Group data' };
    }
}