import oracledb from 'oracledb';
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
import dotenv from 'dotenv';
dotenv.config();
oracledb.autoCommit = true;

 
// connectionn pool
export async function startup() {

    console.log('Starting Oracle database...');
    await oracledb.createPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectString: process.env.DB_CONNECTIONSTRING,
        poolMin: 4,
        poolMax: 10,
        poolAlias: 'default',
        poolIncrement: 1
    });    
    console.log('Database Connection Pool Created...');
    
}

// shutdown database
export async function shutdown() {
    console.log('Shutting down database.');
    try {
        await oracledb.getPool().close(10);
        console.log('Connection Pool closed');
    } catch(err) {
        console.log("ERROR shutting down database: "+err.message);
    }
}

// code to execute sql
export async function execute(sql,binds){
    let connection,results;
    try {
        // Get a connection from the default pool
        connection = await oracledb.getPool().getConnection();
        results = await connection.execute(sql, binds);
    } catch (err) {
        console.log("\n\nERROR executing sql: \n" + err.message + '\n\n');
        console.log('The provided SQL was \n' + sql)
        throw err;
    } finally {
        if (connection) {
            try {
                // Put the connection back in the pool
                await connection.close();
            } catch (err) {
                console.log("ERROR closing connection: " + err);
            }
        }
    }
    //console.log(results)
    return results;
}

// code to execute many sql
export async function executeMany(sql, binds, options){
    let connection;
    try {
        // Get a connection from the default pool
        connection = await oracledb.getConnection();
        await connection.executeMany(sql, binds, options);
    } catch (err) {
        console.log("ERROR executing sql: " + err.message);
        console.log('The provided SQL was \n' + sql)
    } finally {
        if (connection) {
            try {
                // Put the connection back in the pool
                await connection.close();
            } catch (err) {
                console.log("ERROR closing connection: " + err);
            }
        }
    }

    return;
}


// options for execution sql
const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT
}

export default options;



