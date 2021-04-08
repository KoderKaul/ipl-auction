import {
  CssBaseline,
  Grid,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ReactRoundedImage from "react-rounded-image";
import { Players } from "../../Players";
import useStyles from "./PlayerDisplay.styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const PlayersDisplay = () => {
  const players = Players;
  const classes = useStyles();
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setNickname(localStorage.getItem("nickName"));
    };
    fetchData();
  }, []);
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Welcome {nickname} to IPL Auction Presented by DORA
          </Typography>
          <Button color="inherit" endIcon={<ExitToAppIcon />}>
            Leave Room
          </Button>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Grid container direction="column" className={classes.row} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.rowTitle}>
            Mumbai Indians
          </Typography>
        </Grid>
        {players
          .filter((player) => player.teamName === "Mumbai Indians")
          .map((player, index) => {
            return (
              <Grid item xs={2}>
                <Player key={index} player={player} />
              </Grid>
            );
          })}
      </Grid>

      <Grid container direction="row" className={classes.row} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.rowTitle}>
            Chennai Super Kings
          </Typography>
        </Grid>
        {players
          .filter((player) => player.teamName === "Chennai Super Kings")
          .map((player, index) => {
            return (
              <Grid item xs={2}>
                <Player key={index} player={player} />
              </Grid>
            );
          })}
      </Grid>

      <Grid container direction="row" className={classes.row} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.rowTitle}>
            Kolkata Knight Riders
          </Typography>
        </Grid>
        {players
          .filter((player) => player.teamName === "Kolkata Knight Riders")
          .map((player, index) => {
            return (
              <Grid item xs={2}>
                <Player key={index} player={player} />
              </Grid>
            );
          })}
      </Grid>

      <Grid container direction="row" className={classes.row} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.rowTitle}>
            Delhi Capitals
          </Typography>
        </Grid>
        {players
          .filter((player) => player.teamName === "Delhi Capitals")
          .map((player, index) => {
            return (
              <Grid item xs={2}>
                <Player key={index} player={player} />
              </Grid>
            );
          })}
      </Grid>

      <Grid container direction="row" className={classes.row} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.rowTitle}>
            Rajasthan Royals
          </Typography>
        </Grid>
        {players
          .filter((player) => player.teamName === "Rajasthan Royals")
          .map((player, index) => {
            return (
              <Grid item xs={2}>
                <Player key={index} player={player} />
              </Grid>
            );
          })}
      </Grid>

      <Grid container direction="row" className={classes.row} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.rowTitle}>
            Sunrisers Hyderabad
          </Typography>
        </Grid>
        {players
          .filter((player) => player.teamName === "Sunrisers Hyderabad")
          .map((player, index) => {
            return (
              <Grid item xs={2} spacing={2}>
                <Player key={index} player={player} />
              </Grid>
            );
          })}
      </Grid>

      <Grid container direction="row" className={classes.row} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.rowTitle}>
            Royal Challengers Bangalore
          </Typography>
        </Grid>
        {players
          .filter((player) => player.teamName === "Royal Challengers Bangalore")
          .map((player, index) => {
            return (
              <Grid item xs={2}>
                <Player key={index} player={player} />
              </Grid>
            );
          })}
      </Grid>

      <Grid container direction="row" className={classes.row} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.rowTitle}>
            Kings XI Punjab
          </Typography>
        </Grid>
        {players
          .filter((player) => player.teamName === "Kings XI Punjab")
          .map((player, index) => {
            return (
              <Grid item xs={2}>
                <Player key={index} player={player} />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};
export const Player = (prop) => {
  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        spacing={2}
        alignItems="center"
      >
        <Paper className={classes.innerContainer}>
          <Grid item xs={12}>
            <ReactRoundedImage
              image={prop.player.image_url}
              imageWidth="180"
              imageHeight="180"
              roundedColor="#000"
              roundedSize="6"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" style={{ margin: "10px 0px" }}>
              {prop.player.playerName != null
                ? prop.player.playerName.toUpperCase()
                : prop.player.toUpperCase()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Role:{" "}
              {prop.player.role != null
                ? prop.player.role.toUpperCase()
                : console.log(prop)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Rating: {prop.player.rating}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Base Price:{" "}
              {prop.player.basePrice != null
                ? prop.player.basePrice.toUpperCase()
                : console.log(prop)}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};
export default PlayersDisplay;
