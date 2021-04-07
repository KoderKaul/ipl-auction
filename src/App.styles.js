import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  App: {
    height: "100%",
    color: "white",
    overflowY: "hidden",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));
