const mssql = require("mssql");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, ".env") });


console.log(process.env.DB_USER);
console.log(process.env.DB_PWD);
console.log(process.env.DB_SERVER);



const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  server: process.env.DB_SERVER,
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
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Fancy')
BEGIN
    CREATE DATABASE Fancy
END
`;

const createTables = `
USE Fancy
CREATE TABLE Skoobs(
    Id VARCHAR(200),
    Name VARCHAR(500),
    Price INT
)

`;

const addBooks = ` 

CREATE OR ALTER PROCEDURE addBooks(
    @Id VARCHAR(200), @Name VARCHAR(500), @Price INT
)
AS
BEGIN
INSERT INTO Skoobs(Id,Name, Price) VALUES(@Id, @Name , @Price)
END

`;


const getBooks = `

CREATE OR ALTER PROCEDURE getBooks
AS
BEGIN
SELECT * FROm Skoobs
END

`;


 const connectdatabase = async () => {
    try {
      let pool = await mssql.connect(sqlConfig);
      console.log("Connected to DB ... ");
  
      let result = await (
        await pool
          .request()
          .query(" SELECT * FROM sys.databases WHERE name = 'Fancy'")
      ).recordset[0];
      // If result is undefined then there is no database
      if (result === undefined) {
        await pool.request().query(createDatabaseQuery);
        console.log("Database Created.. ");
        let pool2 = await mssql.connect({ ...sqlConfig, database: "Fancy" });
        await pool2.request().query("USE Fancy");
        await pool2.request().query(createTables);
        console.log("Tables Created ...");
        await pool2.request().query("USE Fancy");
        await pool2.request().query(addBooks);
        await pool2.request().query("USE Fancy");
        await pool2.request().query(getBooks);
        console.log("Procedures Created ... ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  connectdatabase();