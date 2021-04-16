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
exports.createService = exports.createCars = exports.cars = void 0;
const Cars_1 = __importDefault(require("../models/Cars"));
const Service_1 = __importDefault(require("../models/Service"));
const cars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cars = yield Cars_1.default.find();
    return res.status(200).json({ cars });
});
exports.cars = cars;
const createCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, make, model, estimatedate, image, km, service_repairs, } = req.body;
    const createCar = yield Cars_1.default.create({
        description,
        make,
        model,
        estimatedate,
        image,
        km,
        service_repairs,
    });
    res.status(200).json({ message: "Service Car Created", car: createCar });
});
exports.createCars = createCars;
const createService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, partialIdentity, plates, selectedDate, serviceId, } = req.body;
    let order = 0;
    try {
        //validate if there is any service yet?
        const auto = yield Cars_1.default.findById(serviceId, {});
        if (auto.service_repairs.length === 0) {
            console.log("no tiene servicios ");
            next;
        }
        else {
            order = auto.service_repairs.length += 1;
        }
        const serviceOrder = yield new Service_1.default({
            name,
            email,
            plates,
            selectedDate,
            service_identity: `${partialIdentity}-${order}`,
            car_repairs: serviceId,
        });
        yield serviceOrder.save().then((newService) => __awaiter(void 0, void 0, void 0, function* () {
            yield Cars_1.default.findByIdAndUpdate(serviceId, {
                $push: { service_repairs: newService._id },
            }, { new: true });
            next();
        }));
        res.status(200).json({ message: "Servicio creado" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createService = createService;
