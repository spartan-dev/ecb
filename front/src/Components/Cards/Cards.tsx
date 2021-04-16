import React, { useState, useEffect } from "react";
import ServiceForm from "../ServiceForm";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Chip from "@material-ui/core/Chip";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red, yellow } from "@material-ui/core/colors";
import { Divider } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      margin: "1rem",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    service: {
      backgroundColor: yellow[500],
    },
  })
);

interface CardCarProps {
  description: string;
  make: string;
  model: string;
  estimatedate: string;
  image: string;
  serviceId: string;
  km: number;
  repairs: number;
}

const CardCar: React.FC<CardCarProps> = ({
  description,
  make,
  model,
  estimatedate,
  image,
  serviceId,
  km,
  repairs,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {}, [repairs]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={clsx(classes.root, { [classes.service]: expanded })}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {`${make.trim().slice(0, 1)}`}
          </Avatar>
        }
        action={
          !expanded ? (
            <></>
          ) : (
            <Chip
              variant="outlined"
              size="small"
              label="To Service!"
              onDelete={handleExpandClick}
              color="secondary"
            />
          )
        }
        title={`${make} ${model}`}
        subheader={`${estimatedate} km: ${km}`}
      />
      <CardMedia
        className={classes.media}
        image={`${image}`}
        title={`${make} ${model}`}
      />
      <CardContent>
        <div style={{ marginBottom: "10px" }}>
          Services{" "}
          <Badge badgeContent={repairs} color="error">
            <DirectionsCarIcon />
          </Badge>
        </div>
        <Divider style={{ marginBottom: "2em" }} />
        <Typography variant="body2" color="textSecondary" component="p">
          {`${description}`} <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere ullam
          rem esse, corrupti voluptatum ratione accusantium, accusamus, ex
          quidem a quibusdam. Ipsa unde ipsam nam eaque sunt maiores, odit
          soluta!
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <SettingsApplicationsIcon color="primary" fontSize="large" />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ServiceForm
            serviceId={serviceId}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CardCar;
