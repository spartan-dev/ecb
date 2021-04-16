import mongoose, { Schema, model } from "mongoose";

const carSchema = new Schema({
  description: { type: String, trim: true },
  make: { type: String, trim: true },
  model: { type: String, trim: true },
  estimatedate: { type: String, trim: true },
  image: { type: String, trim: true },
  km: { type: Number },
  service_repairs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Services" }],
});

const Car = model("Car", carSchema);

export default Car;
