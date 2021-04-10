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
import { Player } from "../PlayerDisplay/PlayersDisplay";
import firebase from "../../Firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory, useParams } from "react-router-dom";
import { SendRenderPlayer } from "./SendRenderPlayer";

function AuctioneerRoom() {
  const classes = useStyles();
  const [teamPlayers, setTeamPlayers] = useState([]);
  const nick = localStorage.getItem("nickName");
  console.log(nick);
  const username = localStorage.getItem("nickName");
  const { room } = useParams();
  const history = useHistory();

  const [highestBidder,setHighestBidder] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState({
    playerName: "",
    basePrice: 0,
    currentBid: 0,
    image_url: "",
    role: "",
    teamName: "",
    rating: "",
    id: "",
    soldTo: "",
    status: "",
  });

  const renderPlayers = async () => {
    firebase
      .database()
      .ref("rooms/")
      .orderByChild("roomname")
      .equalTo(room)
      .on("value", (snapshot) => {
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
      console.log("sending data")
    e.preventDefault();
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
        console.log(currentPlayer)
        k.push(currentPlayer);
        console.log(k);
        const userRef = firebase.database().ref("users/" + kk.key);
        userRef.update({ team: k });
      });
  };

  useEffect(() => {
    renderPlayers();
    renderCurrentPlayer();
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
          soldTo: crntRoom.currentPlayer.soldTo,
          status: crntRoom.currentPlayer.status,
          id: crntRoom.currentPlayer.id,
        });
      });
  };

  const renderHighestBidder = () =>{
      firebase
      .database()
      .ref("rooms/")
      .on("value", (snapshot) =>{
        let crntRooms = snapshotToArray(snapshot);
        let crntRoom = crntRooms.find((x) => x.roomname === room);
        setHighestBidder(crntRoom.highestBidder);
      })
  }

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
            Welcome {nick} to IPL Auction Presented by DORA
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
      <Grid item lg={6} className={classes.leftSide}>
        {currentPlayer === "none" ? (
          <Typography variant="h2">Auction Not Started</Typography>
        ) : (
          <Grid container direction="column">
            <Grid item className={classes.headingLul}>
              <div className={classes.heading}>
              <Typography variant="h4">Highest Bidder: {highestBidder}</Typography>
              </div>
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
                      imageWidth="180"
                      imageHeight="180"
                      roundedColor="#000"
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
                  <Grid item xs={12}>
                    <Typography variant="h5">
                      Current Bid: {currentPlayer.currentBid}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "10px 10px" }}
                  onClick={sendData}
                >
                  Sold
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "10px 10px" }}
                >
                  Skip
                </Button>
              </div>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item lg={6} className={classes.rightSide}>
        <Grid item className={classes.headingLul}>
          <div className={classes.heading}>
            <Typography variant="h3">All Players</Typography>
          </div>
        </Grid>
        <Grid container alignItems="center">
          {teamPlayers.map((player, index) => {
            return <SendRenderPlayer key={index} player={player} room={room} />;
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AuctioneerRoom;
