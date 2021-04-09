import { CssBaseline, Grid, Typography, Paper, AppBar, Toolbar, Button } from "@material-ui/core";
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
    <div
    ><AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Welcome {nickname} to IPL Auction Presented by DORA
          </Typography>
          <Button
            color="inherit"
            endIcon={<ExitToAppIcon />}
          >
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
          .filter((player) => {
            if (player.teamName === "Mumbai Indians") return player;
            else{
                return null;
            }
          })
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
          .filter((player) => {
            if (player.teamName === "Chennai Super Kings") return player;
            else{
                return null;
            }
          })
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
          .filter((player) => {
            if (player.teamName === "Kolkata Knight Riders") return player;
            else{
                return null;
            }
          })
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
          .filter((player) => {
            if (player.teamName === "Delhi Capitals") return player;
            else{
                return null;
            }
          })
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
          .filter((player) => {
            if (player.teamName === "Rajasthan Royals") return player;
            else{
                return null;
            }
          })
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
          .filter((player) => {
            if (player.teamName === "Sunrisers Hyderabad") return player;
            else{
                return null;
            }
          })
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
          .filter((player) => {
            if (player.teamName === "Royal Challengers Bangalore")
              return player;
              else{
                return null;
            }
          })
          .map((player, index) => {
            return (
              <Grid item xs={2} >
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
          .filter((player) => {
            if (player.teamName === "Kings XI Punjab") return player;
            else{
                return null;
            }
          })
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
    <Paper className={classes.innerContainer} >
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
            roundedColor="#000"
            roundedSize="6"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" style={{margin: "10px 0px"}}>
            {prop.player.playerName != null
                ? prop.player.playerName.toUpperCase()
                : prop.player.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" >
            Role: {prop.player.role != null
                ? prop.player.role.toUpperCase()
                : prop.player.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" >
            Rating: {prop.player.rating}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" >
            Base Price: {prop.player.basePrice}
          </Typography>
        </Grid>
      </Grid>
      </Paper>
    </div>
  );
};
export default PlayersDisplay;
