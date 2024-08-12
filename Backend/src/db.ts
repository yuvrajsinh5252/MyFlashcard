import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";

const pool = new Pool({
  connectionString:
    "postgresql://Flash_owner:WinvC8q4HATR@ep-wispy-frog-a5xufaow-pooler.us-east-2.aws.neon.tech/Flash?sslmode=require",
});

export async function CreateUser(id: number, name: string) {
  const client = await pool.connect();
  const checkUserQuery = "SELECT * FROM users WHERE id = $1";
  const checkUserResult = await client.query(checkUserQuery, [id]);

  if (checkUserResult.rowCount === 0) {
    const insertUserQuery = "INSERT INTO users (id, name) VALUES ($1, $2)";
    await client.query(insertUserQuery, [id, name]);
  }
  client.release();
}

export async function CreateCard(
  userId: string,
  name: string,
  items: number,
  questions: string[],
  answers: string[]
) {
  const client = await pool.connect();
  const uniqueId = uuidv4();

  const checkCardQuery = "SELECT * FROM groupcards WHERE name = $1";
  const checkCardResult = await client.query(checkCardQuery, [name]);

  if (checkCardResult.rowCount === 0) {
    const insertCardQuery =
      "INSERT INTO groupcards (items, name, groupid, user_id) VALUES ($1, $2, $3, $4)";
    await client.query(insertCardQuery, [items, name, uniqueId, userId]);

    const insertQuestionsQuery =
      "INSERT INTO cards (id, question, answer) VALUES ($1, $2, $3)";
    for (let i = 0; i < items; i++) {
      await client.query(insertQuestionsQuery, [
        uniqueId,
        questions[i],
        answers[i],
      ]);
    }
  }

  client.release();
}

export async function GetCardGroup(userId: string) {
  const client = await pool.connect();
  const query = "SELECT * FROM groupcards WHERE user_id = $1";
  const result = await client.query(query, [userId]);
  client.release();
  return result.rows;
}

export async function GetCard(id: string) {
  const client = await pool.connect();

  const query = "SELECT * FROM cards WHERE id = $1";
  const result = await client.query(query, [id]);

  client.release();
  return result.rows;
}
