import mssql from "mssql";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  server: process.env.DATABASE_SERVICE_SERVICE_HOST,
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

const createDatabaseQuery = `
use master
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Fruits')
BEGIN
    CREATE DATABASE Fruits
END
`;

//everything after this part will run when the database is created

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

export const connectdatabase = async () => {
  try {
    let pool = await mssql.connect(sqlConfig);
    console.log("Connected to DB ... ");

    let result = await (
      await pool
        .request()
        .query(" SELECT * FROM sys.databases WHERE name = 'Fruits'")
    ).recordset[0];
    // If result is undefined then there is no database
    if (result === undefined) {
      await pool.request().query(createDatabaseQuery);
      console.log("Database Created.. ");
      let pool2 = await mssql.connect({ ...sqlConfig, database: "Fruits" });
      await pool2.request().query("USE Fruits");
      await pool2.request().query(createTables);
      console.log("Tables Created ...");
      await pool2.request().query("USE Fruits");
      await pool2.request().query(addFruits);
      await pool2.request().query("USE Fruits");
      await pool2.request().query(getFruits);
      console.log("Procedures Created ... ");
    }
  } catch (error) {
    console.log(error);
  }
};

connectdatabase();
