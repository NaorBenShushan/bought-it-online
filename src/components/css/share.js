import { fade } from "@material-ui/core/styles";

export const useStyles = (theme) => ({
  root: {
    margin: "0 auto",
    "& > *": {
      display: "flex",
    },
  },
  paper: {
    padding: "2em",
    [theme.breakpoints.up("md")]: {
      width: "130ch",
      margin: "0 auto",
    },
    [theme.breakpoints.up("xl")]: {
      minWidth: "80ch",
      height: "60ch",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
    },
  },
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
    width: "100%",
  },

  gridItem: {
    color: "red",
    maxWidth: "39ch",
    overflowWrap: "anywhere",
  },

  smHeadline: {
    color: "black",
    marginBottom: "0.3em",
  },

  gridContainer: {
    [theme.breakpoints.up("md")]: {
      //minWidth: "1200px",
      margin: "0 auto",
    },
  },

  /* Search Box */
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.12),
    },
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "60%",
      margin: "0 auto",
    },
    [theme.breakpoints.up("md")]: {
      width: "30%",
      margin: "0 auto",
    },
    [theme.breakpoints.up("xl")]: {
      width: "20%",
      margin: "0 auto",
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
});
