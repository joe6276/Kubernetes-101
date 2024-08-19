"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const mssql_1 = __importDefault(require("mssql"));
const Config_1 = require("./Config");
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
app.use((0, express_1.json)());
app.use((0, cors_1.default)());
app.post("/fruits", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
app.get("/fruits", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        let fruits = yield (yield pool.request().execute('getFruits')).recordset;
        res.status(200).json(fruits);
    }
    catch (error) {
    }
}));
//Just a test URL
app.use("/test", (req, res) => {
    res.status(200).send('<h1> Hello There!! </h1>');
});
app.listen(4000, () => {
    console.log("Server Running");
});
