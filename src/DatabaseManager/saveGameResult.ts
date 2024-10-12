import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alireza1995!',
    database: 'game_db',
});

export async function saveGameResult(
  player1Id: string,
  player2Id: string,
  player1Score: number,
  player2Score: number,
  winnerId: string
): Promise<{ success: boolean; message: string; }> {

  try {
    const gameId = generateToken();  // Unique identifier for the game (you can use a UUID or a custom token)
    const query = `
      INSERT INTO game_results (game_id, player1_id, player2_id, player1_score, player2_score, winner_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    // Execute the query
    await pool.query(query, [gameId, player1Id, player2Id, player1Score, player2Score, winnerId]);

    return { success: true, message: 'Game result saved successfully' };

  } catch (error) {
    console.error('Error saving game result:', error);
    return { success: false, message: 'Failed to save game result' };
  }
}

function generateToken() {
    let token = '';
    for (let i = 0; i < 5; i++) {
        token += Math.floor(Math.random() * 10);
    }
    return token;
}
