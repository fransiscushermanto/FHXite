import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import User from "./User";
import PropTypes from "prop-types";
import clsx from "clsx";
import io from "socket.io-client";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import "../../css/Admin/admin.css";
import {
  makeStyles,
  Snackbar,
  IconButton,
  SnackbarContent
} from "@material-ui/core";
import {
  Close as CloseIcon,
  CheckCircle,
  Error,
  Info,
  Warning
} from "@material-ui/icons";
import { amber, green } from "@material-ui/core/colors";

const Admin = ({ widths }) => {
  let { path, url } = useRouteMatch();
  const socketRef = React.useRef();
  useEffect(() => {
    const socketUrl = `${process.env.REACT_APP_SOCKET_URL ||
      window.location.origin}`;
    socketRef.current = io.connect(socketUrl);
  }, []);

  const socket = socketRef.current;

  const navlistItem = [{ key: 1, text: "User", href: "user", active: true }];

  const variantIcon = {
    success: CheckCircle,
    warning: Warning,
    error: Error,
    info: Info
  };

  const useStyles = makeStyles(theme => ({
    success: {
      backgroundColor: green[600]
    },
    close: {
      padding: theme.spacing(0.5)
    },
    info: {
      backgroundColor: theme.palette.primary.main
    },
    warning: {
      backgroundColor: amber[700]
    },
    icon: {
      fontSize: 20
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1)
    },
    message: {
      display: "flex",
      alignItems: "center"
    }
  }));

  const classes = useStyles();

  const [navList, setNavList] = useState(navlistItem);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");

  const handleClick = string => {
    setOpen(true);
    setResponse(string);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  function RenderNavList() {
    return navList.map(list => {
      const { key, text, href, active } = list;
      return (
        <li
          key={key}
          className={active === true ? "nav-list-item active" : "nav-list-item"}
        >
          <button onClick={() => setActiveNavbar(list)}>
            <Link to={`${url}/${href}`}>{text}</Link>
          </button>
        </li>
      );
    });
  }

  const setActiveNavbar = target => {
    const active = [...navList];
    const index = active.indexOf(target);
    const list = active.filter(c => c.key !== target.key);
    list.map(data => {
      const item = [...list];
      const index = list.indexOf(data);
      if (item[index].active === true) {
        item[index].active = !item[index].active;
        setNavList(item);
      }
      return data;
    });
    if (active[index].active === false) {
      active[index].active = !active[index].active;
    }
    setNavList(active);
  };

  const MySnackbar = props => {
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)}></Icon>
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
        {...other}
      />
    );
  };

  MySnackbar.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired
  };

  const RenderMySnackBar = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbar
          onClose={handleClose}
          variant="success"
          message={response}
        />
      </Snackbar>
    );
  };

  const Tes = () => {
    return (
      <div>
        <h1></h1>
      </div>
    );
  };

  return (
    <div className="wrapper" style={{ zIndex: widths === 100 ? "3" : "0" }}>
      <Navbar navList={navList} RenderNavList={RenderNavList}></Navbar>

      <div
        className="control-wrapper"
        style={{ zIndex: widths === 100 ? "3" : "0" }}
      >
        <Switch>
          <Route exact path={`${path}/user`}>
            {socket && <User socket={socket} handleClick={handleClick}></User>}
          </Route>
        </Switch>
      </div>

      <RenderMySnackBar />
    </div>
  );
};

export default Admin;
