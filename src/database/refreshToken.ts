import { conn } from "./db";

interface RefreshTokenRecord {
  token_id: string;
  user_id: string;
  token: string;
  created_at: Date;
}

export default class RefreshToken {
  private static tableName: string = "refresh_tokens";

  static async upsertToken(tokenId: string, userId: string, token: string): Promise<void> {
    console.log({tokenId, userId, token})
    try {
      const query = `
        INSERT INTO ${this.tableName} (token_id, user_id, token)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE token = VALUES(token)
      `;
      await conn.query(query, [tokenId, userId, token]);
    } catch (error) {
      console.error("Error upserting refresh token:", error);
      throw new Error("Database error");
    }
  }

  // Obtener un refresh token por su valor
  static async getToken(refreshToken: string): Promise<RefreshTokenRecord | null> {
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE token = ?`;
      const [rows] = await conn.query<RefreshTokenRecord[]>(query, [refreshToken]);
      // @ts-ignore
      return rows[0] || null; // Devuelve null si no se encuentra ningún registro
    } catch (error) {
      console.error("Error retrieving refresh token:", error);
      throw new Error("Database error");
    }
  }

  // Eliminar un refresh token
  static async deleteToken(tokenId: string): Promise<void> {
    try {
      const query = `DELETE FROM ${this.tableName} WHERE token_id = ?`;
      await conn.query(query, [tokenId]);
    } catch (error) {
      console.error("Error deleting refresh token:", error);
      throw new Error("Database error");
    }
  }

  static async getTokenByUserID(userId: string): Promise<RefreshTokenRecord | null> {
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE user_id = ?`;
      const rows = await conn.query<RefreshTokenRecord[]>(query, [userId]);
      // @ts-ignore
      return rows[0] || null; // Devuelve null si no se encuentra ningún registro
    } catch (error) {
      console.error("Error retrieving refresh token:", error);
      throw new Error("Database error");
    }
  }
}
