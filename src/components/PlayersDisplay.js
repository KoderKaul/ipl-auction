import { CssBaseline, Grid } from "@material-ui/core";
import React from "react";
import ReactRoundedImage from "react-rounded-image";
import { Players } from "../Players";

const PlayersDisplay = () => {
  const players = Players;
  return (
    <div style={{ padding: 20 }}>
      <CssBaseline />
      <Grid container direction="row" spacing={0}>
        {players.map((player, index) => {
          return <Player key={index} player={player} />;
        })}
      </Grid>
    </div>
  );
};
const Player = (prop) => {
  return (
    <div>
      <Grid container direction="column" justify="center">
        <Grid item>
          <ReactRoundedImage />
        </Grid>
        <Grid item>
          <h1 style={{ textAlign: "center", fontSize: "1rem" }}>
            {prop.player.playerName}
          </h1>
        </Grid>
      </Grid>
    </div>
  );
};
export default PlayersDisplay;
