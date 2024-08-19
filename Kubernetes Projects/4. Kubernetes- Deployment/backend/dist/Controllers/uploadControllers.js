"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
dotenv_1.default.config({ path: path_1.default.join('../../.env') });
const uploadImage = (req, res) => {
    try {
        const keyName = `images/${(0, uuid_1.v4)()}.jpeg`;
        const s3 = new aws_sdk_1.default.S3({
            region: 'us-east-1',
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_ACCESS
        });
        s3.getSignedUrl('putObject', {
            Bucket: process.env.BUCKET_NAME,
            Key: keyName,
            ContentType: 'image/jpeg'
        }, (err, url) => res.send({ url, key: keyName }));
    }
    catch (error) {
    }
};
exports.uploadImage = uploadImage;
