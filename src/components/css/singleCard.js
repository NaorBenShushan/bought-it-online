import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  root: {},
  // Card size => width: 263px, height: 342 px

  card: {
    //maxWidth: "260px",
    minWidth: "263px",
  },

  media: {
    margin: "0 auto",
    /* Desired image size: width: 208, height: 210 */
    width: "208px",
    height: "210px",
    overflow: "hidden",
  },

  image: {
    minHeight: "100%",
    minWidth: "100%",
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: green[400],
  },
  cardContent: {
    textAlign: "left",
    fontSize: "1rem",
  },
  cardContentSpan: {
    fontWeight: "bold",
  },
  description: {
    maxWidth: 228,
    overflowWrap: "anywhere",
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  shareButtonMenu: {
    position: "absolute",
    bottom: "55em",
  },
}));
