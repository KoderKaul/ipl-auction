import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "500px",
    height: "300px",
    padding: "20px",
    margin: "50px 0",
    borderRadius: "10px",
  },
  imgContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  doraImg: {
    marginTop: "100px",
    height: "250px",
  },
  iplLogo: {
    height: "50px",
    marginBottom: "10px",
  },
  banner: {
    height: "250px",
  },
  submitButton: {
    marginTop: "5px",
  },
}));
