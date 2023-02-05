import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./components/Pages/Register";
import Login from "./components/Pages/Login";
import NavBar from "./components/NavBar/NavBar";
import CreateEvents from "./components/AfterLogin/CreateEvents";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import AllEvents from "./components/AfterLogin/AllEvents";
import ApprovedEvents from "./components/AfterLogin/ApprovedEvents";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ToastContainer autoClose={1000} />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <PrivateRoute exact path="/all-events">
          <AllEvents />
        </PrivateRoute>
        <PrivateRoute exact path="/approved-events">
          <ApprovedEvents />
        </PrivateRoute>
        <PrivateRoute exact path="/create-events">
          <CreateEvents />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
