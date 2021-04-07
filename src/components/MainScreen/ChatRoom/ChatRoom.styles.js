import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  sendMessage:{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding:"0 10px",
  },
  title: {
    flexGrow: 1,
  },
}));
