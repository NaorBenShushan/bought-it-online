import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    maxHeight: "77px",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(2 - 4),
    },
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  dropDownPaper: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "7em",
      position: "absolute",
      left: "20",
      top: "15px",
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "8em",
    },
    marginRight: theme.spacing(2),
  },

  dropdownItems: {
    minHeight: "3em",
    left: "-10px",
    top: "-7px",
    textTransform: "capitalize",
    maxHeight: "50px",
    color: "#4C5D73",
    textDecoration: "none",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2em",
      textAlign: "center",
    },
  },

  // Signup, Login, Logout, My boughts
  cornerLinks: {
    display: "flex",
    maxHeight: "77px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2em",
      /* top: "1.4em",
      width: "30vw",
      maxWidth: "30vw", */
      //display: "absolute",
      marginRight: "28px",
      maxWidth: "5em",
    },
    [theme.breakpoints.up("sm")]: {
      justify: "flex-end",
      maxWidth: "15em",
    },
  },

  cornerWelcomeText: {
    textTransform: "capitalize",
    color: "#4C5D73",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2em",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.4em",
    },
  },

  links: {
    maxHeight: "25px",
    textTransform: "capitalize",
    color: "#4C5D73",
    textDecoration: "none",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2em",
      textAlign: "center",
    },
  },
}));
