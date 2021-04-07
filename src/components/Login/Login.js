import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {
  Typography,
  TextField,
  Container,
  IconButton,
  CircularProgress,
  Paper,
} from "@material-ui/core";
import firebase from "../../Firebase";
import useStyles from "./Login.styles";
import dora from "../../img/doralogo-white.png";
import ipl from "../../img/ipl.png";
import banner from "../../img/trophy.jpg";

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);
  const [user, setUser] = useState({
    nickName: "",
  });
  const ref = firebase.database().ref("users/");

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoading(true);
    ref
      .orderByChild("nickName")
      .equalTo(user.nickName)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          localStorage.setItem("nickName", user.nickName);
          history.push("/roomlist");
          setShowLoading(false);
        } else {
          const newUser = firebase.database().ref("users/").push();
          newUser.set(user);
          localStorage.setItem("nickName", user.nickName);
          history.push("/roomlist");
          setShowLoading(false);
        }
      });
  };

  return (
    <div className={classes.mainContainer}>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.innerContainer}>
          <img src={ipl} className={classes.iplLogo} />
          <Typography variant="h3">Join</Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required={true}
            InputLabelProps={{ shrink: true }}
            value={user.nickName}
            onChange={(e) => {
              setUser({
                ...user,
                nickName: e.target.value,
              });
            }}
          />

          {showLoading ? (
            <CircularProgress className={classes.submitButton}/>
          ) : (
            <IconButton
              className={classes.submitButton}
              color="primary"
              onClick={handleSubmit}
            >
              <ArrowForwardIcon fontSize="large" />
            </IconButton>
          )}
        </Paper>
      </Container>
      <div className={classes.imgContainer}>
        <img src={dora} className={classes.doraImg} />
      </div>
      <Typography variant="h3" style={{ color: "#fff" }}>
        Presents
      </Typography>
      <Typography variant="h1" style={{ color: "#fff" }}>
        IPL
      </Typography>
      <Typography variant="h1" style={{ color: "#fff" }}>
        Auction
      </Typography>
    </div>
  );
}

export default Login;
