import mssql from 'mssql'
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

//lets create a configuration object for MSSQL 
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

// Above configuration does not contain the database because  we dont have one at the moment but lets create:

const createDatabaseQuery = `
use master
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Fruits')
BEGIN
    CREATE DATABASE Fruits
END
`;

// Above is the query but its not executed yet
// More queries to create tables and two procedures to add new fruit and get fruits

const createTables = `
USE Fruits
CREATE TABLE FruitsTable (Id VARCHAR(255) PRIMARY KEY , Name VARCHAR(255), ImageUrl  VARCHAR(255))
`;

const addFruits = ` 

CREATE OR ALTER PROCEDURE addFruit(@Id VARCHAR(255), @Name VARCHAR(255), @ImageUrl VARCHAR(255))
AS
BEGIN
INSERT INTO FruitsTable (Id,Name,ImageUrl) VALUES(@Id,@Name,@ImageUrl)
END
`;
const getFruits = `
CREATE OR ALTER PROCEDURE  getFruits
AS
BEGIN
SELECT * FROM FruitsTable 
END
`;

// now lets create a method to run the above queries 
export  const connectandCreate = async () => {
    // lets create a pool

 try{
    let pool = await mssql.connect(sqlConfig);
    console.log("Connected to DB ... ");
    // After connecting to the database lets write a query that wil confirm if the DB exists:
    let result = await (
        await pool
          .request()
          .query(" SELECT * FROM sys.databases WHERE name = 'Fruits'")
      ).recordset[0];

      // if resuli is udefined then the Db does not exist.

      if (result === undefined) {
        // Create DB
        await pool.request().query(createDatabaseQuery);
        console.log("Database Created.. ");
        // now we will create a different connection pool with the Database included
        let pool2 = await mssql.connect({ ...sqlConfig, database: "Fruits" });
        // now lets execute the tables and procedures
        await pool2.request().query("USE Fruits");
      await pool2.request().query(createTables);
      console.log("Tables Created ...");
      await pool2.request().query("USE Fruits");
      await pool2.request().query(addFruits);
      await pool2.request().query("USE Fruits");
      await pool2.request().query(getFruits);
      console.log("Procedures Created ... ");
      }
 }catch(error){
    console.log(error);
    
 }
}

connectandCreate()