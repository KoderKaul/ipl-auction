import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  innerContainer: {
    borderRadius: "10px",
    marginTop: theme.spacing(6),
    padding: theme.spacing(4),
    minWidth: "350px",
  },
  heading: {
    display: "flex",
    flexGrow: 1,
  },
  outerContainer: {
    display: "flex",
    flexDirection: "column",
  },
  headingLul: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
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
  fav: {
    margin: theme.spacing(2),
    padding: theme.spacing(6),
  },
}));
