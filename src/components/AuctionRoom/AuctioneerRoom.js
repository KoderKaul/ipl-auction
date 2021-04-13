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
import img from "../../img/placeholder2.png";

// Table Code
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
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
});

// Table Code End

function AuctioneerRoom() {
  const classes = useStyles();
  const [teamPlayers, setTeamPlayers] = useState([]);
  const nick = localStorage.getItem("nickName");
  const username = localStorage.getItem("nickName");
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
        // console.log(room);
        const players = snapshotToArray(snapshot);
        // console.log(players);
        const playa = players.find((x) => x.roomname === room);
        // console.log(players);
        const team = playa.players != null ? playa.players : [];
        // console.log(team[0]);
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
    //     console.log("sending data");
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
      .ref("roomusers/")
      .orderByChild("nickname")
      .equalTo(highestBidder)
      .once("value", (snapshot) => {
        let k = [];
        k = snapshotToArray(snapshot);
        const kk = k.find((x) => x.nickname === highestBidder);
        const roomUserRef = firebase.database().ref("roomusers/" + kk.key);
        roomUserRef.update({
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
        playRef.update({
          status: "sold",
        });
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
        // console.log(crntRoom.currentPlayer);
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
                borderRadius: "35px",
                padding: "10px",
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
        <div style={{ margin: "50px" }}>
          <CustomizedTables room={room} />
        </div>
      </Grid>
      <Grid item lg={7} className={classes.rightSide}>
        <Grid item className={classes.headingLul}>
          <Typography variant="h3">All Players</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center">
            {teamPlayers
              .filter((player) => player.status != "sold")
              .map((player, index) => {
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

function CustomizedTables(prop) {
  const classes = useStylez();
  const thisRoom = prop.room;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const handleClickOpen = (namer) => {
    //     console.log("1", namer);
    setName(namer);
    //     console.log("11", name);
    setOpen(true);
  };

  const handleClose = (condition) => {
    //     console.log("2", name);
    if (condition == "yes" && name != "") {
      firebase
        .database()
        .ref("users/")
        .orderByChild("nickName")
        .equalTo(name)
        .once("value", (snapshot) => {
          var array = snapshotToArray(snapshot);
          const kk = array.find((x) => x.nickName === name);
          const roomUserRef = firebase.database().ref("users/" + kk.key);
          //   console.log(roomUserRef);
          roomUserRef.update({
            wallet: 0,
          });
        });
      firebase
        .database()
        .ref("roomusers/")
        .orderByChild("nickname")
        .equalTo(name)
        .once("value", (snapshot) => {
          var array = snapshotToArray(snapshot);
          const kk = array.find((x) => x.nickname === name);
          const roomUserRef = firebase.database().ref("roomusers/" + kk.key);
          //   console.log(roomUserRef);
          roomUserRef.update({
            wallet: 0,
          });
        });
    }
    setName("");
    setOpen(false);
  };
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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>PlayerName</StyledTableCell>
            <StyledTableCell align="right">Remaining Budget</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roomData.map((data) => (
            <StyledTableRow key={data.nickname}>
              <StyledTableCell
                component="th"
                scope="row"
                onClick={() => handleClickOpen(data.nickname)}
              >
                {data.nickname}
              </StyledTableCell>
              <StyledTableCell align="right">{data.wallet}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Do you want to kick"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Its makes their wallet = 0 !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("no")} color="primary">
            No
          </Button>
          <Button onClick={() => handleClose("yes")} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}
