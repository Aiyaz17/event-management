import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

const NavBar = () => {
  let { redux_auth } = useSelector((state) => ({ ...state }));
  const history = useHistory();
  const dispatch = useDispatch();

  const loogingOut = () => {
    dispatch({
      type: "LOGGED_OUT",
      payload: null,
    });
    localStorage.removeItem("redux_auth");
    history.push("/");
    window.location.reload();
  };

  return (
    // <div className="nav d-flex justify-content-around">
    <Grid
      sx={{
        display: "flex",
        justifyContent: "space-between",
        height: "80px",
        alignItems: "center",
        boxShadow: "0px 0px 5px grey",
      }}
      className="section"
    >
      <Typography
        variant="h1"
        className="logo"
        sx={{
          fontSize: "2rem",
          color: "#002ab0",
          fontWeight: "bolder",
          opacity: 0.85,
        }}
      >
        EventFlow
      </Typography>
      <Grid sx={{ display: "flex", gap: "40px", fontSize: "1.2rem" }}>
        {redux_auth === null && (
          <>
            <Link className="nav-link" to="/register">
              Register
            </Link>
            <Link className="nav-link" to="/">
              Login
            </Link>
          </>
        )}
        {redux_auth !== null && (
          <>
            <Link className="nav-link" to="/all-events">
              All Events
            </Link>
            <Link className="nav-link" to="/approved-events">
              Approved Events
            </Link>
            <Link className="nav-link" to="/create-events">
              Create Events
            </Link>
            <a className="nav-link" href="#" onClick={loogingOut}>
              Logout
            </a>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default NavBar;
