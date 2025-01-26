import { Sequelize } from "sequelize";

import dotenv from "dotenv";
dotenv.config();

const environment = process.env.NODE_ENV || "development";

const dbName = process.env.LOCAL_DB_NAME || process.env.PROD_DB_NAME;
const dbUserName = process.env.LOCAL_DB_USERNAME || process.env.PROD_DB_USERNAME;
const dbPassword = process.env.LOCAL_DB_PASSWORD || process.env.PROD_DB_PASSWORD;
const dbHost = process.env.LOCAL_DB_HOST || process.env.PROD_DB_HOST;

if (!dbName || !dbUserName || !dbPassword) {
  throw new Error("Database environment variables are missing.");
}

const db = new Sequelize(dbName, dbUserName, dbPassword, {
  host: dbHost,
  dialect: "mysql",
  logging: false,
});

async function testConnection() {
    try {
      await db.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
  testConnection();
  export default db;
  