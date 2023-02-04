import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import Register from './components/Pages/Register';
import Login from './components/Pages/Login';
import NavBar from './components/NavBar/NavBar';
import CreateEvents from './components/AfterLogin/CreateEvents';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <ToastContainer autoClose={2000}/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/create-event" element={<CreateEvents/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
