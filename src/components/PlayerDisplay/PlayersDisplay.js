import {
  CssBaseline,
  Grid,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Button,
} from "@material-ui/core";
import React from "react";
import ReactRoundedImage from "react-rounded-image";
import { Players } from "../../Players";
import useStyles from "./PlayerDisplay.styles";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const PlayersDisplay = () => {
  const players = Players;
  const classes = useStyles();
  const history = useHistory();

  const exitRoom = () => {
    history.goBack();
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            startIcon={<ArrowBackIcon />}
            onClick={exitRoom}
          >
            Go Back
          </Button>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Grid container direction="column" className={classes.row} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.rowTitle}>
            Mumbai Indians
          </Typography>
        </Grid>
        {players
          .filter((player) => {
            if (player.teamName === "Mumbai Indians") return player;
            else {
              return null;
            }
          })
          .map((player, index) => {
            return (
              <Grid item xs={12} lg={2} md={3} sm={4}>
                <Player key={index} player={player} teamColor="#015EA0" />
              </Grid>
            );
          })}
      </Grid>

      <Grid container direction="row" className={classes.row} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.rowTitle}>
            Chennai Super Kings
          </Typography>
        </Grid>
        {players
          .filter((player) => {
            if (player.teamName === "Chennai Super Kings") return player;
            else {
              return null;
            }
          })
          .map((player, index) => {
            return (
              <Grid xs={12} lg={2} md={3} sm={4}>
                <Player key={index} player={player} teamColor="#FDBA33" />
              </Grid>
            );
          })}
      </Grid>

      <Grid container direction="row" className={classes.row} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.rowTitle}>
            Kolkata Knight Riders
          </Typography>
        </Grid>
        {players
          .filter((player) => {
            if (player.teamName === "Kolkata Knight Riders") return player;
            else {
              return null;
            }
          })
          .map((player, index) => {
            return (
              <Grid item xs={12} lg={2} md={3} sm={4}>
                <Player key={index} player={player} teamColor="#3D2356" />
              </Grid>
            );
          })}
      </Grid>

      <Grid container direction="row" className={classes.row} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.rowTitle}>
            Delhi Capitals
          </Typography>
        </Grid>
        {players
          .filter((player) => {
            if (player.teamName === "Delhi Capitals") return player;
            else {
              return null;
            }
          })
          .map((player, index) => {
            return (
              <Grid item xs={12} lg={2} md={3} sm={4}>
                <Player key={index} player={player} teamColor="#004C93" />
              </Grid>
            );
          })}
      </Grid>

      <Grid container direction="row" className={classes.row} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.rowTitle}>
            Rajasthan Royals
          </Typography>
        </Grid>
        {players
          .filter((player) => {
            if (player.teamName === "Rajasthan Royals") return player;
            else {
              return null;
            }
          })
          .map((player, index) => {
            return (
              <Grid xs={12} lg={2} md={3} sm={4}>
                <Player key={index} player={player} teamColor="#014B8C" />
              </Grid>
            );
          })}
      </Grid>

      <Grid container direction="row" className={classes.row} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.rowTitle}>
            Sunrisers Hyderabad
          </Typography>
        </Grid>
        {players
          .filter((player) => {
            if (player.teamName === "Sunrisers Hyderabad") return player;
            else {
              return null;
            }
          })
          .map((player, index) => {
            return (
              <Grid item xs={12} lg={2} md={3} sm={4}>
                <Player key={index} player={player} teamColor="#F3572E" />
              </Grid>
            );
          })}
      </Grid>

      <Grid container direction="row" className={classes.row} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.rowTitle}>
            Royal Challengers Bangalore
          </Typography>
        </Grid>
        {players
          .filter((player) => {
            if (player.teamName === "Royal Challengers Bangalore")
              return player;
            else {
              return null;
            }
          })
          .map((player, index) => {
            return (
              <Grid item xs={12} lg={2} md={3} sm={4}>
                <Player key={index} player={player} teamColor="#000" />
              </Grid>
            );
          })}
      </Grid>

      <Grid container direction="row" className={classes.row} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.rowTitle}>
            Punjab Kings
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row">
            {players
              .filter((player) => {
                if (player.teamName === "Kings XI Punjab") return player;
                else {
                  return null;
                }
              })
              .map((player, index) => {
                return (
                  <Grid item xs={12} lg={2} md={3} sm={4}>
                    <Player key={index} player={player} teamColor="#B33124" />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export const Player = (prop) => {
  const classes = useStyles();
  const mySentence =
    prop.player.playerName != null ? prop.player.playerName.toLowerCase() : "";
  const finalSentence = mySentence.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
  const role = prop.player.role != null ? prop.player.role.toLowerCase() : "";
  const Role = role.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );

  return (
    <div>
      <Paper className={classes.innerContainer}>
        <Grid
          container
          direction="column"
          justify="center"
          spacing={2}
          alignItems="center"
        >
          <Grid item xs={12}>
            <ReactRoundedImage
              image={prop.player.image_url}
              imageWidth="180"
              imageHeight="180"
              roundedColor={prop.player.teamColor}
              roundedSize="6"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", fontSize: "1.3rem" }}
            >
              {finalSentence}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Role: {Role}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Rating: {prop.player.rating}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Base Price: {prop.player.basePrice}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default PlayersDisplay;
