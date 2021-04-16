import "date-fns";
import React, { useState, SetStateAction } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { serviceRegister, getInitialCars } from "../../services/calls";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

interface ServiceFormProps {
  serviceId: string;
  expanded: boolean;
  setExpanded: React.Dispatch<SetStateAction<boolean>>;
}

/* form de persona {:nombre, correo, placas,}  fecha de entrega numero de id de servicio */

const ServiceForm: React.FC<ServiceFormProps> = ({
  serviceId,
  setExpanded,
  expanded,
}) => {
  const timeElapsed = Date.now();
  const partialIdentity = serviceId.slice(serviceId.length - 4);
  const [form, setForm] = useState<object>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(timeElapsed)
  );
  const classes = useStyles();
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setForm({
      ...form,
      selectedDate,
      partialIdentity,
      serviceId,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    console.log(form);
    const callService = await serviceRegister(form);

    const { message } = await callService.json();
    console.log(message);
    if (message) {
      // cerrar el modal del
      setForm({});
      //limpiar la form de
      setExpanded(!expanded);
      //actualizar el estado de los chips
      window.location.replace("/");
    }
  };
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <h5>Partial Service Code</h5>
      <Typography variant="body2" color="textSecondary" component="p">
        {partialIdentity}
      </Typography>
      <Divider />
      <TextField
        onChange={handleInputChange}
        id="outlined-basic"
        name="name"
        label="Name"
        variant="outlined"
      />
      <TextField
        onChange={handleInputChange}
        id="outlined-basic"
        name="email"
        label="Email"
        variant="outlined"
      />
      <TextField
        onChange={handleInputChange}
        id="outlined-basic"
        name="plates"
        label="License Plates"
        variant="outlined"
      />
      <Divider />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Delivery Date"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <Divider />
      <Button onClick={handleSubmit} variant="outlined" color="primary">
        Send to service
      </Button>
    </form>
  );
};

export default ServiceForm;
