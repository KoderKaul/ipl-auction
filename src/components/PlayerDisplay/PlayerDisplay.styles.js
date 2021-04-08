import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  rowTitle: {
    color: "#E5E5E5",
    fontWeight: "800",
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
    marginTop: theme.spacing(10),
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
      transform: "scale(1.09)",
      border: "none",
      zIndex: "10px",
    },
    backgroundColor: "#000",
    color: "#fff"
  },
}));
