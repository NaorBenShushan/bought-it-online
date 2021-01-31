import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    maxHeight: '77px',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(2 - 4),
    },
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },

  // Signup, Login, Logout, My boughts
  entireCorner: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9em',
      minHeight: '1.8em',
      position: 'absolute',
      left: '61%',
    },
  },

  cornerLinks: {
    display: 'flex',

    textDecoration: 'none',
    color: '#4C5D73',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
      minHeight: '1.8em',
    },
  },

  cornerWelcomeText: {
    textTransform: 'capitalize',
    color: '#4C5D73',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.4em',
    },
  },

  links: {
    maxHeight: '25px',
    textTransform: 'capitalize',
    color: '#4C5D73',
    textDecoration: 'none',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.2em',
      textAlign: 'center',
    },
  },
}));
