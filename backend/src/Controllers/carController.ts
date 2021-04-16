import { RequestHandler, Request, Response, NextFunction } from "express";
import Car from "../models/Cars";
import Service from "../models/Service";
export const cars: RequestHandler = async (req: Request, res: Response) => {
  const cars = await Car.find();
  return res.status(200).json({ cars });
};

export const createCars = async (req: Request, res: Response) => {
  const {
    description,
    make,
    model,
    estimatedate,
    image,
    km,
    service_repairs,
  } = req.body;
  const createCar = await Car.create({
    description,
    make,
    model,
    estimatedate,
    image,
    km,
    service_repairs,
  });
  res.status(200).json({ message: "Service Car Created", car: createCar });
};

export const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    email,
    partialIdentity,
    plates,
    selectedDate,
    serviceId,
  } = req.body;
  let order: number = 0;
  try {
    //validate if there is any service yet?
    const auto = await Car.findById(serviceId, {});
    if (auto.service_repairs.length === 0) {
      console.log("no tiene servicios ");
      next;
    } else {
      order = auto.service_repairs.length += 1;
    }

    const serviceOrder = await new Service({
      name,
      email,
      plates,
      selectedDate,
      service_identity: `${partialIdentity}-${order}`,
      car_repairs: serviceId,
    });
    await serviceOrder.save().then(async (newService: any) => {
      await Car.findByIdAndUpdate(
        serviceId,
        {
          $push: { service_repairs: newService._id },
        },
        { new: true }
      );
      next();
    });
    res.status(200).json({ message: "Servicio creado" });
  } catch (error) {
    console.log(error);
  }
};
