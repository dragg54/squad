import { Sequelize } from "sequelize";

 const db = new Sequelize('accountability', 'root', 'Ajibolas7', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
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
  