import React, { useState } from "react";
import axios from "axios";
import getBaseUrl from "../../config";
import { useHistory } from "react-router-dom";
import { FormControl, Grid, Typography } from "@mui/material";

const Register = () => {
  const [registration, setRegistration] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { name, email, password, phone } = registration;
  const navigate = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistration({ ...registration, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${getBaseUrl()}/api/user/register`, {
          name,
          email,
          password,
          phone,
        })
        .then((response) => {
          console.log("Register response>> ", response);
          // response.data.token
          // localStorage.setItem("token", response.data.token);
          navigate.push("/login");
        });
    } catch (err) {
      console.log("Error in Register Page ", err);
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
      <Typography variant="h2"> Registration</Typography>

      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="form-group mb-3">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              style={{ width: "300px", fontSize: "1rem" }}
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="phone"
              name="phone"
              className="form-control"
              style={{ width: "300px", fontSize: "1rem" }}
              placeholder="Enter Phone Number"
              value={phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              style={{ width: "300px", fontSize: "1rem" }}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              style={{ width: "300px", fontSize: "1rem" }}
              onChange={handleChange}
            />
          </div>

          <button
            disabled={!email || !password || !name}
            className="btn btn-primary text-white"
          >
            Submit
          </button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Register;
