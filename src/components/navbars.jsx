/* General Imports */
import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import BoughtItLogo from '../static/images/BoughtItLogo.png';

/* Icons and Styles Import */
import { useStyles } from './css/navbars';
import { useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MailIcon from '@material-ui/icons/Mail';
import StarsIcon from '@material-ui/icons/Stars';
import InfoIcon from '@material-ui/icons/Info';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

/* Core Import */
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ClickAwayListener, CssBaseline, Grid } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

export default function Navbars({
  user,
  drawerOpen,
  handleDrawerClose,
  handleDrawerOpen,
}) {
  const classes = useStyles();
  const theme = useTheme();

  // < DROP DOWN RIGHT-MENU >
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // < DROP DOWN RIGHT-MENU />

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ background: '#80deea' }}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            {/* MenuButton + Logo */}
            <Grid item>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <Tooltip title="Open the menu">
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      className={clsx(
                        classes.menuButton,
                        drawerOpen && classes.hide
                      )}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>

                {/* Logo */}
                <Grid item>
                  <Link to="/">
                    <Tooltip title="Go to home page">
                      <img
                        src={BoughtItLogo}
                        component="img"
                        alt="logo"
                        width="210"
                        className={classes.logo}
                      />
                    </Tooltip>
                  </Link>
                </Grid>
              </Grid>
            </Grid>

            {/* Corner Links */}
            <Grid item className={classes.entireCorner}>
              {/* < Dropdown Menu > */}
              <Tooltip title="Open menu">
                <Button
                  style={{ minHeight: '4em', minWidth: '10.5em' }}
                  /* \/ drop down props \/ */
                  ref={anchorRef}
                  aria-controls={open ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  endIcon={<ArrowDropDownIcon />}
                >
                  <span className={classes.cornerWelcomeText}>
                    <span
                      style={{
                        display: 'inline-block',
                        paddingRight: '0.25rem',
                      }}
                    >
                      Hi,
                    </span>
                    {!user && <span>Guest</span>}
                    {user && <span>{user.name}</span>}
                  </span>
                </Button>
              </Tooltip>

              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper>
                      {/* \/ First Item \/ */}
                      {!user && (
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList autoFocusItem={open} id="menu-list-grow">
                            <MenuItem
                              className={classes.cornerLinks}
                              component={Link}
                              to="/login"
                            >
                              Login
                            </MenuItem>
                            <MenuItem
                              className={classes.cornerLinks}
                              component={Link}
                              to="/register"
                            >
                              Register
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      )}
                      {/* \/ Second Item \/ */}
                      {user && (
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList autoFocusItem={open} id="menu-list-grow">
                            <MenuItem
                              className={classes.cornerLinks}
                              component={Link}
                              to="/my-boughts"
                            >
                              My Boughts
                            </MenuItem>
                            <MenuItem
                              className={classes.cornerLinks}
                              component={Link}
                              to="/logout"
                            >
                              Logout
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      )}
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* < TOP NAV > */}

      {/* < LEFT NAV > */}

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List className={classes.listItems}>
          <Link style={{ color: 'black', textDecoration: 'none' }} to="/share">
            <Tooltip title="Share a Bought with us!">
              <ListItem button>
                <ListItemIcon>
                  <AddShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Share Your Boughts" />
              </ListItem>
            </Tooltip>
          </Link>
          <Link
            style={{ color: 'black', textDecoration: 'none' }}
            to="/favorites"
          >
            <Tooltip title="Your favorite Boughts">
              <ListItem button>
                <ListItemIcon>
                  <StarsIcon />
                </ListItemIcon>
                <ListItemText primary="My Favorites" />
              </ListItem>
            </Tooltip>
          </Link>
        </List>

        <Divider />

        <List className={classes.listItems}>
          <Link style={{ color: 'black', textDecoration: 'none' }} to="/about">
            <Tooltip title="About us">
              <ListItem button>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
            </Tooltip>
          </Link>
          <Link
            style={{ color: 'black', textDecoration: 'none' }}
            to="/contact-us"
          >
            <Tooltip title="Contact us">
              <ListItem button>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary="Contact Us" />
              </ListItem>
            </Tooltip>
          </Link>
        </List>
      </Drawer>
      {/* < LEFT NAV /> */}
    </div>
  );
}
