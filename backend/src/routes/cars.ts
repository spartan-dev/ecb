import { Router } from "express";
//importar el modelo
const router = Router();
import { cars, createCars, createService } from "../Controllers/carController";

router.get("/home", cars);
router.post("/create", createCars);
router.post("/service", createService);
export default router;
