import React, { Component } from "react";
import clsx from "clsx";
import "./App.css";

import Navbars from "./components/navbars";
import Footer from "./components/footer";
import Home from "./components/home";
import About from "./components/about";
import Login from "./components/login";
import Register from "./components/register";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "./services/userService";
import Favorites from "./components/favorites";
import Share from "./components/share";
import ContactUs from "./components/contactUs";
import Logout from "./components/logout";
import MyBoughts from "./components/myBoughts";
import ProtectedRoute from "./components/common/protectedRoute";
import { withStyles } from "@material-ui/core";
import EditCard from "./components/common/editCard";
//import newNavbar from "./components/newNavbar";

const styles = (theme) => ({
  content: {
    marginTop: "64px",
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    //marginLeft: -drawerWidth,
    minHeight: "45vw",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});
//const drawerWidth = 240;

class App extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    const user = userService.getCurrentUser();

    this.setState({ user });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { user, open } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <ToastContainer />
        <header>
          <Navbars
            user={user}
            drawerOpen={open}
            handleDrawerClose={this.handleDrawerClose}
            handleDrawerOpen={this.handleDrawerOpen}
          />
        </header>

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

          {/* Routes */}

          <Switch>
            <ProtectedRoute path="/share" component={Share} />
            <ProtectedRoute path="/my-boughts" component={MyBoughts} />
            <ProtectedRoute path="/logout" component={Logout} />
            <ProtectedRoute path="/favorites" component={Favorites} />
            <ProtectedRoute path="/edit-card/:id" component={EditCard} />
            <Route path="/about" component={About} />
            <Route path="/contact-us" component={ContactUs} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/" exact component={Home} />
          </Switch>
        </main>

        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
