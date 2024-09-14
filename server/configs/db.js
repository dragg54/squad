import { Sequelize } from "sequelize";

//  const db = new Sequelize('accountability', 'root', 'Ajibolas7', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false
// });

const db = new Sequelize( 
  'infonom1_acct',
  'infonom1_infonom',
  'infonomicsng', {
   dialect: 'mysql',
    host: '176.74.18.130',
    // host: '127.0.0.1',
    port: 3306,
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
  