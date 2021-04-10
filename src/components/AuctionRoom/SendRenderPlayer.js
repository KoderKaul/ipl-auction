import { Grid, Typography, Paper } from "@material-ui/core";
import ReactRoundedImage from "react-rounded-image";
import useStyles from "../PlayerDisplay/PlayerDisplay.styles";
import React from "react";
import firebase from "firebase";
const snapshotToArray = (snapshot) => {
  const returnArr = [];
  snapshot.forEach((childSnapshot) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
const sendPlayerData = (prop) => {
  firebase
    .database()
    .ref("rooms/")
    .orderByChild("roomname")
    .equalTo(prop.room)
    .once("value", (snapshot) => {
      const k = snapshotToArray(snapshot);
      const room = k.find((x) => x.roomname === prop.room);
      const userRef = firebase.database().ref("rooms/" + room.key);
      userRef.update({ currentPlayer: prop.player, highestBidder: "none" });
    });
};

export const SendRenderPlayer = (prop) => {
  const classes = useStyles();
  return (
    <div onClick={() => sendPlayerData(prop)}>
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
              roundedColor="#000"
              roundedSize="6"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" style={{ margin: "10px 0px" }}>
              {prop.player.playerName != null
                ? prop.player.playerName.toUpperCase()
                : prop.player.toUpperCase()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Role:{" "}
              {prop.player.role != null
                ? prop.player.role.toUpperCase()
                : prop.player.toUpperCase()}
            </Typography>
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
