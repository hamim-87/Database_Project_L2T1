import oracledb from 'oracledb';
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


const dbConfig = {
  user: 'MetroInverse',
  password: 'MetroInverse',
  connectString: 'localhost:1521/orcl2105160',
};


export async function connectToOracle() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
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

