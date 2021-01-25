import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  // About

  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  avatar: {
    position: "absolute",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "9rem",
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: "9rem",
    },
  },
  founder: {
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      paddingTop: "2rem",
      marginBottom: "3rem",
    },
    [theme.breakpoints.up("sm")]: {
      position: "relative",
      paddingTop: "2rem",
      marginBottom: "3rem",
    },
  },
  aboutFooter: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "25rem",
    },
  },

  // share/contact us

  root: {
    margin: "0 auto",
    "& > *": {
      display: "flex",
    },
  },
  paper: {
    padding: "2em",
    [theme.breakpoints.up("md")]: {
      width: "70%",
      margin: "0 auto",
    },
    [theme.breakpoints.up("xl")]: {
      width: "90%",
      height: "60ch",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
    },
  },
  gridContainer: {},
  gridItem: {},
  input: {
    display: "none",
  },
  button: {
    margin: "1.5rem 0",
    textTransform: "capitalize",
    color: "white",
    backgroundColor: "#44adb3",
    // alignItems: "center",
    textAlign: "center",
    minHeight: "45px",
  },

  /* Search Box */
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.12),
    },
    [theme.breakpoints.down("sm")]: {
      width: "60%",
    },
    [theme.breakpoints.up("md")]: {
      width: "30%",
    },
    [theme.breakpoints.up("xl")]: {
      width: "20%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#4C5D73",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
  /* /Search Box */
}));
