import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  rowTitle: {
    color: "#E5E5E5",
    fontWeight: "1000",
    letterSpacing: "1.5px",
    marginBottom: "-10px",
    marginLeft: "30px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    zIndex: "5",
    marginTop: "10px",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexGrow: 1,
    height: "100%",
  },
  innerContainer: {
    minWidth: "215px",
    marginTop: theme.spacing(2),
    marginLeft: "20px",
    marginRight: "20px",
    paddingBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    borderRadius: "10px",
    padding: "10px",
    transition: "transform 650ms",
    "&:hover": {
      transform: "scale(1.05)",
      border: "none",
      zIndex: "10px",
    },
    title: {
      flexGrow: 1,
    },
  },
}));
