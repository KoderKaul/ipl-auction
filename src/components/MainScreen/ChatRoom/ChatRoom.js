import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Players } from "../../../Players";
import {
  Typography,
  TextField,
  IconButton,
  Container,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  Button,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Row, Col, Card, CardBody, CardSubtitle } from "reactstrap";
import Moment from "moment";
import firebase from "../../../Firebase";
import ScrollToBottom from "react-scroll-to-bottom";
import SendIcon from "@material-ui/icons/Send";

import useStyles from "./ChatRoom.styles";
import "../../../Styles.css";

function ChatRoom() {
  const classes = useStyles();
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [nickname, setNickname] = useState("");
  const [roomname, setRoomname] = useState("");
  const [newchat, setNewchat] = useState({
    roomname: "",
    nickname: "",
    message: "",
    date: "",
    type: "",
  });
  const history = useHistory();
  const { room } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setNickname(localStorage.getItem("nickName"));
      setRoomname(room);
      firebase
        .database()
        .ref("chats/")
        .orderByChild("roomname")
        .equalTo(roomname)
        .on("value", (resp) => {
          setChats([]);
          setChats(snapshotToArray(resp));
        });
    };
    console.log(Players);
    fetchData();
  }, [room, roomname]);

  useEffect(() => {
    const fetchData = async () => {
      setNickname(localStorage.getItem("nickName"));
      setRoomname(room);
      firebase
        .database()
        .ref("roomusers/")
        .orderByChild("roomname")
        .equalTo(roomname)
        .on("value", (resp2) => {
          setUsers([]);
          const roomusers = snapshotToArray(resp2);
          setUsers(roomusers.filter((x) => x.status === "online"));
        });
    };

    fetchData();
  }, [room, roomname]);

  const snapshotToArray = (snapshot) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  };

  const submitMessage = (e) => {
    e.preventDefault();
    const chat = newchat;
    chat.roomname = roomname;
    chat.nickname = nickname;
    chat.date = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    chat.type = "message";
    const newMessage = firebase.database().ref("chats/").push();
    newMessage.set(chat);
    setNewchat({ roomname: "", nickname: "", message: "", date: "", type: "" });
  };

  const exitChat = (e) => {
    const chat = {
      roomname: "",
      nickname: "",
      message: "",
      date: "",
      type: "",
    };
    chat.roomname = roomname;
    chat.nickname = nickname;
    chat.date = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    chat.message = `${nickname} leave the room`;
    chat.type = "exit";
    const newMessage = firebase.database().ref("chats/").push();
    newMessage.set(chat);

    firebase
      .database()
      .ref("roomusers/")
      .orderByChild("roomname")
      .equalTo(roomname)
      .once("value", (resp) => {
        let roomuser = [];
        roomuser = snapshotToArray(resp);
        const user = roomuser.find((x) => x.nickname === nickname);
        if (user !== undefined) {
          const userRef = firebase.database().ref("roomusers/" + user.key);
          userRef.update({ status: "offline" });
        }
      });

    history.goBack();
  };

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
      <Grid item xs={6}>
        <div className="Container">
          <Container>
            <Paper>
              <Row>
                <Col xs="8">
                  <ScrollToBottom className="ChatContent">
                    {chats.map((item, idx) => (
                      <div key={idx} className="MessageBox">
                        {item.type === "join" || item.type === "exit" ? (
                          <div className="ChatStatus">
                            <span className="ChatDate">{item.date}</span>
                            <span className="ChatContentCenter">
                              {item.message}
                            </span>
                          </div>
                        ) : (
                          <div className="ChatMessage">
                            <div
                              className={`${
                                item.nickname === nickname
                                  ? "RightBubble"
                                  : "LeftBubble"
                              }`}
                            >
                              {item.nickname === nickname ? (
                                <span className="MsgName">Me</span>
                              ) : (
                                <span className="MsgName">{item.nickname}</span>
                              )}
                              <span className="MsgDate"> at {item.date}</span>
                              <p>{item.message}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </ScrollToBottom>
                  <div className={classes.sendMessage}>
                    <TextField
                      placeholder="Type Message"
                      fullWidth
                      variant="outlined"
                      size="small"
                      required={true}
                      InputLabelProps={{ shrink: true }}
                      value={newchat.message}
                      onChange={(e) => {
                        e.persist();
                        setNewchat({
                          ...newchat,
                          message: e.target.value,
                        });
                      }}
                    />
                    <IconButton
                      className={classes.submitButton}
                      color="primary"
                      onClick={submitMessage}
                    >
                      <SendIcon fontSize="large" />
                    </IconButton>
                  </div>
                </Col>
                <Col xs="4">
                  <div>
                    {users.map((item, idx) => (
                      <Card key={idx} className="UsersCard">
                        <CardBody>
                          <CardSubtitle>{item.nickname}</CardSubtitle>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </Col>
              </Row>
            </Paper>
          </Container>
        </div>
      </Grid>
      <Grid item xs={6}>
        {Players.map((player, id) => (
          <Typography key={id}>{player.playerName}</Typography>
        ))}
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
