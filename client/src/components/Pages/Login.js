import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import getBaseUrl from "../../config";
import { FormControl, Grid, Typography } from "@mui/material";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${getBaseUrl()}/api/user/login`, {
          email,
          password,
        })
        .then((response) => {
          response = response.data.data;
          console.log("Login User>> ", JSON.stringify(response));
          toast.success("Login Succesfull !!");
          localStorage.setItem("redux_auth", JSON.stringify(response));

          dispatch({
            type: "LOGGED_IN",
            payload: response,
          });
          history.push("/all-events");
        });
    } catch (err) {
      console.log("Error in Login Page ", err);
    }
  };

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        height: "90vh",
        mt: "5%",
      }}
    >
      <Typography variant="h2"> Login Page</Typography>

      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item sx={{ mt: 6 }}>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <FormControl>
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={email}
                style={{ width: "300px", fontSize: "1rem" }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>

            <FormControl sx={{ mt: 3 }}>
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                style={{ width: "300px", fontSize: "1rem" }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>

            <button
              disabled={!email || !password}
              className="btn btn-primary text-white"
            >
              Submit
            </button>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
