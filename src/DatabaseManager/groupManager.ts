import mysql, { RowDataPacket } from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alireza1995!',
    database: 'game_db',
});

export async function requestJoinGroup(playerToken: string, groupID: number) {
    try {
        const [result]: [RowDataPacket[], any] = await pool.query('SELECT requests FROM `group` WHERE id = ?', [groupID]);

        if (result.length === 0) {
            return { success: false, message: "Group not found" };
        }

        let friendRequests: string[] = [];
        try {
            const currentRequests = result[0].requests || '[]';

            if (currentRequests === '{}' || currentRequests === '') {
                friendRequests = [];
            } else {
                friendRequests = JSON.parse(currentRequests);
            }

            if (!Array.isArray(friendRequests)) {
                throw new Error('Friend requests is not an array');
            }
        } catch (error) {
            console.error('Error parsing friendRequests:', error);
            return { success: false, message: "Error parsing join Group requests" };
        }
        console.log(result[0].requests);
        if (friendRequests.includes(playerToken)) {
            return { success: false, message: "Join request already sent" };
        }

        friendRequests.push(playerToken);

        await pool.query('UPDATE `group` SET requests = ? WHERE id = ?', [JSON.stringify(friendRequests), groupID]);

        return { success: true, message: "Group request sent successfully" };
    } catch (error) {
        console.error('Error in addFriendRequest:', error);
        return { success: false, message: "Error requesting friend" };
    }
}

