"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const cars_1 = __importDefault(require("./routes/cars"));
const PORT = 5000;
const app = express_1.default();
app.use(cors_1.default(config_1.config));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const mongoConnect = "mongodb://localhost/testecb";
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};
mongoose_1.default
    .connect(mongoConnect, mongooseOptions)
    .then(() => {
    console.log("DataBase is connected");
    app.listen(PORT, () => console.log(`Runing free 🔥 on port ${PORT}`));
})
    .catch((error) => console.log(`Hay un error en la conexion : ${error}`));
//routes
app.use(cars_1.default);
