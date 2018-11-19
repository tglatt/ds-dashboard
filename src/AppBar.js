import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import {
  Typography,
  Hidden,
  Divider,
  Drawer,
  List,
  Toolbar,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar as _AppBar
} from "@material-ui/core";

import {
  BarChart as BarChartIcon,
  Launch as LaunchIcon,
  Menu as MenuIcon
} from "@material-ui/icons";

const DrawerContent = ({ config, classes }) => (
  <React.Fragment>
    <div className={classes.toolbarIcon} />
    <Divider />
    <List>
      {config.groups.map(group => (
        <Link to={group.url} key={group.url}>
          <ListItem button>
            <ListItemIcon style={{ marginRight: 8 }}>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText style={{ paddingLeft: 0 }} primary={group.title} />
          </ListItem>
        </Link>
      ))}
    </List>
    <Divider />
    <List>
      {config.links.map(link => (
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          key={link.url}
        >
          <ListItem button>
            <ListItemIcon style={{ marginRight: 8 }}>
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText style={{ paddingLeft: 0 }} primary={link.title} />
          </ListItem>
        </a>
      ))}
    </List>
  </React.Fragment>
);

const AppBar = ({ config, classes, handleDrawerToggle, drawerOpen }) => (
  <React.Fragment>
    <_AppBar position="fixed" className={classNames(classes.appBar)}>
      <Toolbar disableGutters={!drawerOpen} className={classes.toolbar}>
        <Hidden smUp>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
          noWrap
          style={{ marginLeft: 10 }}
          className={classes.title}
        >
          {config.title}
        </Typography>
      </Toolbar>
    </_AppBar>

    <Hidden smUp>
      <Drawer
        variant="temporary"
        classes={{
          paper: classes.drawerPaper
        }}
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        <DrawerContent config={config} classes={classes} />
      </Drawer>
    </Hidden>
    <Hidden xsDown>
      <Drawer
        classes={{
          paper: classes.drawerPaper
        }}
        variant="permanent"
        open
      >
        <DrawerContent config={config} classes={classes} />
      </Drawer>
    </Hidden>
  </React.Fragment>
);

export default AppBar;