"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fruitController_1 = require("../Controllers/fruitController");
const fruitsRouter = (0, express_1.Router)();
fruitsRouter.get("", fruitController_1.getFruits);
fruitsRouter.post("", fruitController_1.addFruits);
exports.default = fruitsRouter;
