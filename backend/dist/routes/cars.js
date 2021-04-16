"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//importar el modelo
const router = express_1.Router();
const carController_1 = require("../Controllers/carController");
router.get("/home", carController_1.cars);
router.post("/create", carController_1.createCars);
router.post("/service", carController_1.createService);
exports.default = router;
