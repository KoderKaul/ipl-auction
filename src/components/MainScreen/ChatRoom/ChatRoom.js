import React, { useState, useEffect } from "react";
import { Player } from "../../PlayerDisplay/PlayersDisplay";
import {
  Typography,
  TextField,
  Grid,
  AppBar,
  Toolbar,
  Button,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import firebase from "../../../Firebase";

import useStyles from "./ChatRoom.styles";
import "../../../Styles.css";
import { useHistory } from "react-router";

function ChatRoom() {
  const classes = useStyles();
  const nick = localStorage.getItem("nickName");
  const [nickname, setNickname] = useState("");
  const [username, setusername] = useState("");

  const [playerName, setPlayer] = useState("");
  const [teamPlayers, setTeamPlayers] = useState([]);

  const history = useHistory();
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       setNickname(localStorage.getItem("nickName"));
  //       setRoomname(room);
  //       firebase
  //         .database()
  //         .ref("chats/")
  //         .orderByChild("roomname")
  //         .equalTo(roomname)
  //         .on("value", (resp) => {
  //           setChats([]);
  //           setChats(snapshotToArray(resp));
  //         });
  //     };
  //     console.log(Players);
  //     fetchData();
  //   }, [room, roomname]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       setNickname(localStorage.getItem("nickName"));
  //       setRoomname(room);
  //       firebase
  //         .database()
  //         .ref("roomusers/")
  //         .orderByChild("roomname")
  //         .equalTo(roomname)
  //         .on("value", (resp2) => {
  //           setUsers([]);
  //           const roomusers = snapshotToArray(resp2);
  //           setUsers(roomusers.filter((x) => x.status === "online"));
  //         });
  //     };

  //     fetchData();
  //   }, [room, roomname]);

  const snapshotToArray = (snapshot) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  };

  const exitChat = (e) => {
    //     const chat = {
    //       roomname: "",
    //       nickname: "",
    //       message: "",
    //       date: "",
    //       type: "",
    //     };
    //     chat.roomname = roomname;
    //     chat.nickname = nickname;
    //     chat.date = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    //     chat.message = `${nickname} leave the room`;
    //     chat.type = "exit";
    //     const newMessage = firebase.database().ref("chats/").push();
    //     newMessage.set(chat);

    //     firebase
    //       .database()
    //       .ref("roomusers/")
    //       .orderByChild("roomname")
    //       .equalTo(roomname)
    //       .once("value", (resp) => {
    //         let roomuser = [];
    //         // console.log(resp);
    //         roomuser = snapshotToArray(resp);
    //         const user = roomuser.find((x) => x.nickname === nickname);
    //         if (user !== undefined) {
    //           const userRef = firebase.database().ref("roomusers/" + user.key);
    //           userRef.update({ status: "offline" });
    //         }
    //       });

    history.goBack();
  };
  const sendData = (e) => {
    e.preventDefault();
    firebase
      .database()
      .ref("users/")
      .orderByChild("nickName")
      .equalTo(username)
      .once("value", (snapshot) => {
        let k = [];
        k = snapshotToArray(snapshot);
        const kk = k.find((x) => x.nickName === username);
        k = kk.team != null ? kk.team : [];
        k.push(playerName);
        const userRef = firebase.database().ref("users/" + kk.key);
        userRef.update({ team: k });
      });
  };

  const renderPlayers = async () => {
    setNickname(localStorage.getItem("nickName"));
    console.log(nickname);
    firebase
      .database()
      .ref("users/")
      .orderByChild("nickName")
      .equalTo(nick)
      .on("value", (snapshot) => {
        setTeamPlayers([]);
        const players = snapshotToArray(snapshot);
        //setTeamPlayers(players.team);
        console.log(players);
        const playa = players.find((x) => x.nickName === nick);
        const team = playa.team != null ? playa.team : [];
        setTeamPlayers(team);
      });
  };

  useEffect(() => {
    renderPlayers();
  }, []);
  return (
    <Grid container className="Container">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Welcome {nickname} to IPL Auction Presented by DORA
          </Typography>
          <Button
            color="inherit"
            onClick={exitChat}
            endIcon={<ExitToAppIcon />}
          >
            Leave Room
          </Button>
        </Toolbar>
      </AppBar>
      <Grid item>
        <Grid container direction="column">
          <Grid item direction="row">
            <form onSubmit={sendData}>
              <TextField
                label="Player Name"
                onChange={(e) => setPlayer(e.target.value)}
              />
              <TextField
                label="Nick Name"
                onChange={(e) => setusername(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </form>
          </Grid>
          <Grid item>
            {teamPlayers.map((player, index) => {
              return (
                <Grid item xs={2}>
                  <Player key={index} player={player} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ChatRoom;

/*<Form className="MessageForm" onSubmit={submitMessage}>
                    <InputGroup>
                      <Input
                        type="text"
                        name="message"
                        id="message"
                        placeholder="Enter message here"
                        value={newchat.message}
                        onChange={onChange}
                      />
                      <InputGroupAddon addonType="append">
                        <Button variant="primary" type="submit">
                          Send
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Form>*/
