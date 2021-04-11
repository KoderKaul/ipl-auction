import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  Button,
} from "@material-ui/core";
import ReactRoundedImage from "react-rounded-image";
import useStyles from "./AuctionRoom.styles";
import firebase from "../../Firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory, useParams } from "react-router-dom";
import { SendRenderPlayer } from "./SendRenderPlayer";

function AuctioneerRoom() {
  const classes = useStyles();
  const [teamPlayers, setTeamPlayers] = useState([]);
  const nick = localStorage.getItem("nickName");
  console.log(nick);
  const { room } = useParams();
  const history = useHistory();

  const [highestBidder, setHighestBidder] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState({
    playerName: "",
    basePrice: 0,
    currentBid: 0,
    image_url: "",
    role: "",
    teamName: "",
    rating: "",
    id: "",
    teamColor: "",
  });

  const renderPlayers = async () => {
    firebase
      .database()
      .ref("rooms/")
      .orderByChild("roomname")
      .equalTo(room)
      .once("value", (snapshot) => {
        setTeamPlayers([]);
        console.log(room);
        const players = snapshotToArray(snapshot);
        //setTeamPlayers(players.team);
        const playa = players.find((x) => x.roomname === room);
        const team = playa.players != null ? playa.players : [];
        setTeamPlayers(team[0]);
      });
  };

  const snapshotToArray = (snapshot) => {
    const returnArr = [];
    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  };

  const sendData = (e) => {
    console.log("sending data");
    e.preventDefault();
    if (highestBidder === "none") return;
    firebase
      .database()
      .ref("users/")
      .orderByChild("nickName")
      .equalTo(highestBidder)
      .once("value", (snapshot) => {
        let k = [];
        k = snapshotToArray(snapshot);
        const kk = k.find((x) => x.nickName === highestBidder);
        k = kk.team != null ? kk.team : [];
        k.push(currentPlayer);
        const userRef = firebase.database().ref("users/" + kk.key);
        userRef.update({
          team: k,
          wallet: kk.wallet - currentPlayer.currentBid,
        });
      });
    firebase
      .database()
      .ref("rooms/")
      .once("value", (snapshot) => {
        let crntRooms = snapshotToArray(snapshot);
        let crntRoom = crntRooms.find((x) => x.roomname === room);
        const playId = currentPlayer.id - 1;
        const playRef = firebase
          .database()
          .ref("rooms/" + crntRoom.key + "/players/0/" + playId);
        playRef.remove();
        const curRef = firebase.database().ref("rooms/" + crntRoom.key);
        curRef.update({
          currentPlayer: { playerName: "none" },
          highestBidder: "none",
        });
      });
    renderPlayers();
  };
  useEffect(() => {
    renderCurrentPlayer();
  }, []);

  useEffect(() => {
    renderPlayers();
  }, []);

  const renderCurrentPlayer = async () => {
    firebase
      .database()
      .ref("rooms/")
      .on("value", (snapshot) => {
        const crntRooms = snapshotToArray(snapshot);
        const crntRoom = crntRooms.find((x) => x.roomname === room);
        console.log(crntRoom.currentPlayer);
        setCurrentPlayer({
          playerName: crntRoom.currentPlayer.playerName,
          basePrice: crntRoom.currentPlayer.basePrice,
          currentBid: crntRoom.currentPlayer.currentBid,
          image_url: crntRoom.currentPlayer.image_url,
          role: crntRoom.currentPlayer.role,
          teamName: crntRoom.currentPlayer.teamName,
          rating: crntRoom.currentPlayer.rating,
          id: crntRoom.currentPlayer.id,
          teamColor: crntRoom.currentPlayer.teamColor,
        });
      });
  };

  const renderHighestBidder = () => {
    firebase
      .database()
      .ref("rooms/")
      .on("value", (snapshot) => {
        let crntRooms = snapshotToArray(snapshot);
        let crntRoom = crntRooms.find((x) => x.roomname === room);
        setHighestBidder(crntRoom.highestBidder);
      });
  };

  useEffect(() => {
    renderHighestBidder();
  }, []);

  const exitRoom = () => {
    history.goBack();
  };

  return (
    <Grid container justify="flex-start">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Welcome {nick} to IPL Auction Presented by DoRA
          </Typography>
          <Button
            color="inherit"
            endIcon={<ExitToAppIcon />}
            onClick={exitRoom}
          >
            Leave Room
          </Button>
        </Toolbar>
      </AppBar>
      <Grid
        item
        lg={5}
        xs={12}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography
              variant="h4"
              style={{
                marginTop: "30px",
                border: "medium solid",
                borderRadius: "3px",
                padding: "5px",
                fontFamily: "Zilla Slab Highlight, cursive",
                backgroundColor: "#ff7600",
              }}
            >
              Current Bid: {currentPlayer.currentBid}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h4"
              style={{
                marginTop: "30px",
                border: "medium solid",
                borderRadius: "3px",
                padding: "5px",
                fontFamily: "Zilla Slab Highlight, cursive",
                backgroundColor: "#ff005c",
              }}
            >
              Highest Bidder: {highestBidder === "none" ? "" : highestBidder}
            </Typography>
          </Grid>
          <Grid item xs={12}>
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
                    imageWidth="250"
                    imageHeight="250"
                    roundedColor={currentPlayer.teamColor}
                    roundedSize="6"
                    image={currentPlayer.image_url}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" style={{ margin: "10px 0px" }}>
                    {currentPlayer.playerName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Role: {currentPlayer.role}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Rating: {currentPlayer.rating}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Base Price: {currentPlayer.basePrice}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              style={{
                margin: "10px 10px",
                padding: "10px  25px 10px 25px",
                backgroundColor: "red",
                fontWeight: "bold",
              }}
              onClick={sendData}
              size="large"
            >
              SOLD!!!
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid item lg={7} className={classes.rightSide}>
        <Grid item className={classes.headingLul}>
          <Typography variant="h3">All Players</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center">
            {teamPlayers.map((player, index) => {
              return (
                <Grid item lg={4} md={4} sm={6} xs={12} spacing={2}>
                  <SendRenderPlayer
                    key={index}
                    player={player}
                    room={room}
                    teamColor={player.teamColor}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AuctioneerRoom;
