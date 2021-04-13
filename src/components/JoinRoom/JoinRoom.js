import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "../../Firebase";
import useStyles from "./JoinRoom.styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  Typography,
  TextField,
  Container,
  Button,
  Toolbar,
  AppBar,
  IconButton,
  Paper,
  Collapse,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import rr from "../../img/rr.jpg";
import csk from "../../img/csk.jpg";
import rcb from "../../img/rcb.jpg";
import mi from "../../img/mi.jpg";
import kxip from "../../img/kxip.jpg";
import dc from "../../img/dc.jpg";
import kkr from "../../img/kkr.jpg";
import ipl from "../../img/IPL-logo2.png";

function JoinRoom() {
  const classes = useStyles();
  const [myRoom, setMyRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [nickName, setNickName] = useState("");
  const history = useHistory();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setNickName(localStorage.getItem("nickName"));
      firebase
        .database()
        .ref("rooms/")
        .on("value", (resp) => {
          setRooms([]);
          setRooms(snapshotToArray(resp));
        });
    };

    fetchData();
  }, []);

  const snapshotToArray = (snapshot) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  };
  const [full, setFull] = useState(false);
  const nextPage = (myRoomname) => {
    if (!full) {
      if (nickName === "###Admin@@@") history.push("/auctioneer/" + myRoomname);
      else {
        history.push("/auctionroom/" + myRoomname);
      }
    } else return;
  };
  const enterChatmyRoom = (myRoomname) => {
    firebase
      .database()
      .ref("roomusers/")
      .orderByChild("roomname")
      .equalTo(myRoomname)
      .once("value", (resp) => {
        let roomuser = [];
        roomuser = snapshotToArray(resp);
        const user = roomuser.find((x) => x.nickname === nickName);
        if (user == undefined) {
          if (roomuser.length < 10) {
            const newroomuser = { roomname: "", nickname: "", wallet: 1000 };
            newroomuser.roomname = myRoomname;
            newroomuser.nickname = nickName;
            const newRoomUser = firebase.database().ref("roomusers/").push();
            newRoomUser.set(newroomuser);
          } else {
            alert("Room is full!");
            setFull(true);
            return;
          }
        }
        nextPage(myRoomname);
      });
  };

  const logout = () => {
    localStorage.removeItem("nickName");
    history.push("/login");
  };

  const checkRoom = () => {
    //     console.log(rooms);
    const existingRoom = rooms.find((room) => room.roomname === myRoom);

    if (existingRoom) {
      enterChatmyRoom(myRoom);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className={classes.mainContainer}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Welcome {nickName} to IPL Auction Presented by DoRA
          </Typography>
          <Button color="inherit" onClick={logout} endIcon={<ExitToAppIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.innerContainer} square>
          {nickName === "###Admin@@@" ? (
            <Link to="/addroom">
              <img src={ipl} alt="IPL" className={classes.iplLogo} />
            </Link>
          ) : (
            <img src={ipl} alt="IPL" className={classes.iplLogo} />
          )}

          <TextField
            label="Room"
            variant="outlined"
            placeholder="Room"
            fullWidth
            required={true}
            InputLabelProps={{ shrink: true }}
            value={myRoom}
            onChange={(e) => {
              setMyRoom(e.target.value);
            }}
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            className={classes.submitButton}
            onClick={checkRoom}
          >
            Join
          </Button>
          <Collapse in={open}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Room Not Found
            </Alert>
          </Collapse>
        </Paper>
      </Container>
      <div className={classes.imgContainer}>
        <img src={rr} alt="RR" className={classes.teamImg1} />
        <img src={csk} alt="CSK" className={classes.teamImg2} />
        <img src={rcb} alt="RCB" className={classes.teamImg3} />
        <img src={mi} alt="MI" className={classes.teamImg4} />
        <img src={dc} alt="DC" className={classes.teamImg3} />
        <img src={kxip} alt="KXIP" className={classes.teamImg2} />
        <img src={kkr} alt="KKR" className={classes.teamImg1} />
      </div>
    </div>
  );
}

export default JoinRoom;
