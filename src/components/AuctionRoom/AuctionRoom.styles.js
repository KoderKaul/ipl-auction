import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  innerContainer: {
    height: "480px",
    width: "400px",
    margin: "100px",
    marginLeft: "200px",
    borderRadius: "10px",
  },
  heading: {
    display: "flex",
    flexGrow: 1,
  },
  outerContainer: {
      display: "flex",
      flexDirection: "column"
  },
  buttons:{
      display: "flex",
      flexDirection: "row",
      marginLeft: "200px"
  },
  headingLul:{
      display: "flex",
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center"
  },
  rightSide: {
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
}));
