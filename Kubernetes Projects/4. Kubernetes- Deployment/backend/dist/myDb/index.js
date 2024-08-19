"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectdatabase = void 0;
const mssql_1 = __importDefault(require("mssql"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    server: "db",
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
const connectdatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(sqlConfig);
        console.log("Connected to DB ... ");
        let result = yield (yield pool
            .request()
            .query(" SELECT * FROM sys.databases WHERE name = 'Fruits'")).recordset[0];
        // If result is undefined then there is no database
        if (result === undefined) {
            yield pool.request().query(createDatabaseQuery);
            console.log("Database Created.. ");
            let pool2 = yield mssql_1.default.connect(Object.assign(Object.assign({}, sqlConfig), { database: "Fruits" }));
            yield pool.request().query("USE Fruits");
            yield pool2.request().query(createTables);
            console.log("Tables Created ...");
            yield pool.request().query("USE Fruits");
            yield pool2.request().query(addFruits);
            yield pool.request().query("USE Fruits");
            yield pool2.request().query(getFruits);
            console.log("Procedures Created ... ");
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.connectdatabase = connectdatabase;
(0, exports.connectdatabase)();
