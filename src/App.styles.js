import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  App: {
    height: "100vh",
    color: "white",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));
