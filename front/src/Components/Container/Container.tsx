import React, { useEffect, useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { getInitialCars } from "../../services/calls";

import CardCar from "../Cards";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "flex-start",
      height: "70vh",
      padding: "2rem",
      margin: "10px",
    },
    semiCont: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);
export interface CardProps {}

const Card: React.FC<CardProps> = () => {
  const [cars, setCars] = useState<any[]>([]);
  useEffect(() => {
    async function callService() {
      const { cars } = await getInitialCars();
      setCars(cars);
    }
    callService();
  }, []);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.semiCont}>
        {cars?.map((car) => {
          return (
            <CardCar
              key={car._id}
              serviceId={car._id}
              description={car.description}
              make={car.make}
              model={car.model}
              image={car.image}
              estimatedate={car.estimatedate}
              km={car.km}
              repairs={car.service_repairs.length}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Card;
