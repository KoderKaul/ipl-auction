import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";
import Login from './components/Login/Login';
import JoinRoom from './components/JoinRoom/JoinRoom';
import AddRoom from './components/AddRoom';
import ChatRoom from './components/MainScreen/ChatRoom/ChatRoom';
import useStyles from './App.styles'

function App() {
  let location = useLocation();
const classes = useStyles();
  return (
    <Router>
      <div className={classes.App}>
        <Redirect
          to={{
            pathname: "/roomlist",
            state: { from: location }
          }}
        />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <SecureRoute path="/roomlist">
            <JoinRoom />
          </SecureRoute>
          <SecureRoute path="/addroom">
            <AddRoom />
          </SecureRoute>
          <SecureRoute path="/chatroom/:room">
            <ChatRoom />
          </SecureRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

function SecureRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('nickName') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}