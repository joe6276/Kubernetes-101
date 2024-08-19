"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadControllers_1 = require("../Controllers/uploadControllers");
const uploadRouter = (0, express_1.Router)();
uploadRouter.get('', uploadControllers_1.uploadImage);
exports.default = uploadRouter;
