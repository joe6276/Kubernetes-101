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
exports.getFruits = exports.addFruits = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const Config_1 = require("../Config");
const addFruits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        let { Name, ImageUrl } = req.body;
        yield pool.request()
            .input('Id', (0, uuid_1.v4)())
            .input('Name', Name)
            .input('ImageUrl', ImageUrl)
            .execute('addFruit');
        res.status(201).json({ message: 'Added Fruit' });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.addFruits = addFruits;
const getFruits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        let fruits = yield (yield pool.request().execute('getFruits')).recordset;
        console.log(fruits);
        res.status(201).json(fruits);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getFruits = getFruits;
