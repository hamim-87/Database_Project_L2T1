import oracledb from 'oracledb';
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
import dotenv from 'dotenv';
dotenv.config();


const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTIONSTRING,
};
let connection;

export async function connectToOracle() {
  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log('Connected to Oracle Database!');

    

    const sql = 'SELECT * FROM user_info';


    const result = await connection.execute(sql);

  
    console.log('Query Result:', result.rows);

   
    await connection.close();
    console.log('Connection closed.');
  } catch (error) {
    console.error('Error connecting to Oracle Database:', error.message);
  }
}

