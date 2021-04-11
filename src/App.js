import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import JoinRoom from "./components/JoinRoom/JoinRoom";
import AddRoom from "./components/AddRoom";
import useStyles from "./App.styles";
import PlayersDisplay from "./components/PlayerDisplay/PlayersDisplay";
import AuctionRoom from "./components/AuctionRoom/AuctionRoom";
import AuctioneerRoom from "./components/AuctionRoom/AuctioneerRoom";

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.App}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/playerlist">
            <PlayersDisplay />
          </Route>
          <Route path="/roomlist">
            <JoinRoom />
          </Route>
          <Route path="/addroom">
            <AddRoom />
          </Route>
          <Route path="/auctioneer/:room">
            <AuctioneerRoom />
          </Route>
          <Route path="/auctionroom/:room">
            <AuctionRoom />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// function SecureRoute({ children, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         localStorage.getItem("nickName") ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// }
