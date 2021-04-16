import mongoose, { Schema, model } from "mongoose";

const serviceSchema = new Schema(
  {
    selectedDate: { type: Date }, // '2021-04-15T12:20:30.056Z',
    service_identity: { type: String },
    name: { type: String },
    email: { type: String },
    plates: { type: String },
    car_repairs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  },
  { timestamps: true }
);
const Service = model("Service", serviceSchema);

export default Service;
