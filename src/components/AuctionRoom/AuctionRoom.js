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
import usseStyles from "../PlayerDisplay/PlayerDisplay.styles";
import firebase from "../../Firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import img from "../../img/placeholder2.png";

// Table Code
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStylez = makeStyles({
  table: {
    minWidth: 500,
  },
  paper: {
    width: "100%",
  },
});

// Table Code End
export default function AuctionRoom() {
  const classes = useStyles();
  const [teamPlayers, setTeamPlayers] = useState([]);
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
  const [currentWallet, setCurrentWallet] = useState();
  const [highestBidder, setHighestBidder] = useState("");
  const nick = localStorage.getItem("nickName");
  const { room } = useParams();
  const history = useHistory();

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
  const renderPurse = async () => {
    firebase
      .database()
      .ref("users/")
      .orderByChild("nickName")
      .equalTo(nick)
      .on("value", (snapshot) => {
        const players = snapshotToArray(snapshot);
        const playa = players.find((x) => x.nickName === nick);
        // console.log(playa.wallet);
        setCurrentWallet(playa.wallet);
      });
  };

  const renderPlayers = async () => {
    firebase
      .database()
      .ref("users/")
      .orderByChild("nickName")
      .equalTo(nick)
      .on("value", (snapshot) => {
        setTeamPlayers([]);
        const players = snapshotToArray(snapshot);
        const playa = players.find((x) => x.nickName === nick);
        const team = playa.team != null ? playa.team : [];
        // console.log(team);
        setTeamPlayers(team);
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

  useEffect(() => {
    renderPlayers();
    renderCurrentPlayer();
    renderPurse();
  }, []);

  const renderCurrentPlayer = async () => {
    firebase
      .database()
      .ref("rooms/")
      .on("value", (snapshot) => {
        const crntRooms = snapshotToArray(snapshot);
        const crntRoom = crntRooms.find((x) => x.roomname === room);
        setCurrentPlayer({
          playerName: crntRoom.currentPlayer.playerName,
          basePrice: crntRoom.currentPlayer.basePrice,
          currentBid: crntRoom.currentPlayer.currentBid,
          image_url: crntRoom.currentPlayer.image_url,
          role: crntRoom.currentPlayer.role,
          teamName: crntRoom.currentPlayer.teamName,
          rating: crntRoom.currentPlayer.rating,
          teamColor: crntRoom.currentPlayer.teamColor,
          id: crntRoom.currentPlayer.id,
        });
      });
  };

  const exitRoom = () => {
    history.goBack();
  };
  const changeBid = (bidval) => {
    if (currentPlayer.playerName === "none") return;
    if (currentWallet - currentPlayer.currentBid < bidval) {
      alert("Insufficent Balance!");
      return;
    }
    if (bidval == 0 && currentPlayer.currentBid !== currentPlayer.basePrice) {
      alert("Bid above Base price");
      return;
    }
    firebase
      .database()
      .ref("rooms/")
      .once("value", (snapshot) => {
        let crntRooms = snapshotToArray(snapshot);
        let crntRoom = crntRooms.find((x) => x.roomname === room);

        const userRef = firebase.database().ref("rooms/" + crntRoom.key);
        // console.log(userRef);
        userRef.update({ highestBidder: nick });
        const bidRef = firebase.database().ref("rooms/" + crntRoom.key);
        bidRef.update({
          currentPlayer: {
            ...currentPlayer,
            currentBid: currentPlayer.currentBid + bidval,
          },
        });
      });
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
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          >
            Instant Win
          </Button>
          <Button color="inherit" component={NavLink} to="/playerlist">
            All Players
          </Button>
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
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="flex-start"
        >
          <Grid item className={classes.headingLul}>
            <Typography
              variant="h4"
              style={{
                marginTop: "30px",
                border: "medium solid",
                borderRadius: "35px",
                padding: "10px",
                backgroundColor: "#ff7600",
              }}
            >
              Auction Balance: {currentWallet}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              style={{
                marginTop: "30px",
                border: "medium solid",
                borderRadius: "35px",
                padding: "5px",
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
                borderRadius: "35px",
                padding: "10px",
                backgroundColor: "#ff005c",
              }}
            >
              Highest Bidder:{" "}
              {highestBidder === "none"
                ? ""
                : highestBidder.lastIndexOf("@#@") != -1
                ? highestBidder.substr(highestBidder.lastIndexOf("@#@") + 3)
                : highestBidder}
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
                    image={
                      currentPlayer.image_url !== undefined
                        ? currentPlayer.image_url
                        : img
                    }
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
          <Fab
            color="secondary"
            className={classes.fav}
            onClick={() => changeBid(0)}
            variant="extended"
          >
            <Typography variant="h5">Buy AT Base</Typography>
          </Fab>
          <div className={classes.buttons}>
            <Fab
              color="secondary"
              className={classes.fav}
              onClick={() => changeBid(5)}
            >
              <AddIcon />
              <Typography variant="h5">5</Typography>
            </Fab>
            <Fab
              color="secondary"
              className={classes.fav}
              onClick={() => changeBid(10)}
            >
              <AddIcon />
              <Typography variant="h5">10</Typography>
            </Fab>
            <Fab
              color="secondary"
              className={classes.fav}
              onClick={() => changeBid(15)}
            >
              <AddIcon />
              <Typography variant="h5">15</Typography>
            </Fab>
          </div>
        </Grid>
        <div style={{ margin: "50px" }}>
          <CustomizedTables room={room} />
        </div>
      </Grid>
      <Grid item lg={7} className={classes.rightSide}>
        <Grid item className={classes.headingLul}>
          <Typography variant="h3">My Team</Typography>
        </Grid>
        <Grid container alignItems="center">
          {teamPlayers.map((player, index) => {
            return (
              <Grid item lg={4} md={6} xs={12}>
                <Player key={index} player={player} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

function CustomizedTables(prop) {
  const classes = useStylez();
  const thisRoom = prop.room;
  const rows = [];

  const [roomData, setRoomData] = useState([]);

  const renderRoomData = () => {
    firebase
      .database()
      .ref("roomusers/")
      .orderByChild("roomname")
      .equalTo(thisRoom)
      .on("value", (snapshot) => {
        setRoomData([]);
        const roomUsers = snapshotToArray(snapshot);
        // console.log(roomUsers);
        setRoomData(roomUsers);
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

  useEffect(() => {
    renderRoomData();
  }, []);

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>PlayerName</StyledTableCell>
            <StyledTableCell align="right">Remaining Budget</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roomData
            .filter((data) => data.nickname != "###Admin@@@")
            .map((data) => {
              return (
                <StyledTableRow key={data.nickname}>
                  <StyledTableCell component="th" scope="row">
                    {data.nickname.lastIndexOf("@#@") != -1
                      ? data.nickname.substr(
                          data.nickname.lastIndexOf("@#@") + 3
                        )
                      : data.nickname}
                  </StyledTableCell>
                  <StyledTableCell align="right">{data.wallet}</StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const Player = (prop) => {
  const classes = usseStyles();
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
              Price: {prop.player.currentBid}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
