import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import List from "./components/List";
import Menu from "./components/Menu";
import Search from "./components/Search.js";
import Resulte from "./components/Resulte.js";

import Favorites from "./components/Favorites";
import { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function BackToTop(props) {
  // const {params} = useRouteMatch()
  // console.log(useRouteMatch())
  const [dataFromList, setDataFromList] = useState([]);
  const [searchResulte, setSearchResulte] = useState("");
  const [showList, setShowList] = useState(true);

  const [searchResulteTO, setSearchResulteTO] = useState("")

  useEffect(() => {
    if (searchResulte != null) {
      // console.log(searchResulte.name);
      setSearchResulteTO(searchResulte.name)
      setShowList(false);
    } else {
      setShowList(true);
    }
  }, [searchResulte]);

  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className={classes.title}>
            Coin
          </Typography>
          <Button color="inherit">
            <Menu />
          </Button>
        </Toolbar>
      </AppBar>

      <Toolbar id="back-to-top-anchor" />
      <Container>
        <Switch>
        <Route exact path="/">
          <Redirect to="/Coin" />
        </Route>
          <Route exact path="/Coin">
            <Search
              resulte={(value) => setSearchResulte(value)}
              list_data={dataFromList}
            />
            <Box>
              {showList ? (
                <List list_data={(value) => setDataFromList(value)} />
              ) : (
                <List
                  searchName={searchResulteTO}
                  list_data={(value) => setDataFromList(value)}
                />
              )}
            </Box>
          </Route>
          <Route exact path="/Favorites">
            <Box>
              <Favorites />
            </Box>
          </Route>
        </Switch>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
