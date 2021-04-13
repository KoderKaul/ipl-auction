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
import ipl from "../../img/IPL-logo2.png";

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);
  const [user, setUser] = useState({
    nickName: "",
    wallet: 1000,
  });
  const ref = firebase.database().ref("users/");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.nickName === "") {
      return;
    }
    setShowLoading(true);
    ref
      .orderByChild("nickName")
      .equalTo(user.nickName.trim())
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
      <div className={classes.imgContainer}>
        <img src={dora} alt="DORA" className={classes.doraImg} />
      </div>
      <Typography variant="h4" style={{ color: "#fff" }}>
        Presents
      </Typography>
      <Typography variant="h2" style={{ color: "#fff" }}>
        IPL
      </Typography>
      <Typography variant="h2" style={{ color: "#fff" }}>
        Auction
      </Typography>
      <Container component="main" maxWidth="sm" style={{ width: "auto" }}>
        <Paper className={classes.innerContainer}>
          <img src={ipl} alt="ipl" className={classes.iplLogo} />
          <Typography variant="h4">Join</Typography>
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
                nickName: e.target.value.replace(/^\s+|\s+$/g, ""),
              });
            }}
          />

          {showLoading ? (
            <CircularProgress className={classes.submitButton} />
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
    </div>
  );
}

export default Login;
