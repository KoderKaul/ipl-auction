import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
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
    width: "27vw",
    padding: "20px",
    margin: "100px 0",
    borderRadius: "10px",
  },
  submitButton: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2),
  },
  imgContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
    marginTop: theme.spacing(8)
  },
  teamImg1: {
    height: "300px",
    zIndex: "10",
    margin: "0 5px",
    width: "12.5vw",
  },
  teamImg2: {
    height: "300px",
    zIndex: "10",
    margin: "0 5px",
    width: "12.5vw",
  },
  teamImg3: {
    height: "300px",
    zIndex: "10",
    margin: "0 5px",
    width: "12.5vw",
  },
  teamImg4: {
    height: "300px",
    zIndex: "10",
    margin: "0 5px",
    width: "12.5vw",
  },
  iplLogo: {
    height: "50px",
    marginBottom: "10px",
  },
  title: {
    flexGrow: 1,
  },
}));
