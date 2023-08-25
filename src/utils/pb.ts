import { Client } from "pg";
import fs from "fs";

export const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: 5432,
});

export const connect = async () => {
  await client.connect();
};

export const seed = async () => {
  try {
    await client.query(`
    DROP TABLE IF EXISTS estates;
   
    CREATE TABLE estates (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL
    );
    `);

    await Promise.all(
      JSON.parse(fs.readFileSync("data.json").toString()).map(
        (estate: { name: string; image: string }) => {
          client.query(
            `INSERT INTO estates (name, image) VALUES ('${estate.name}', '${estate.image}')`
          );
        }
      )
    );

    console.log("DB seeded");
  } catch (err) {
    console.error("DB seed error");
    console.error(err);
  }
};

client.on("error", (err) => {
  console.error("DB error");
});

client.on("end", () => {
  console.log("DB connection ended");
});
