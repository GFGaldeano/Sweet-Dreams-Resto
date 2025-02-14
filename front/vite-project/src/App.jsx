import React, { useContext, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./views/Home/Home";
import MisTurnos from "./views/MisTurnos/MisTurnos";
import Intro from "./views/Intro/Intro";
import Login from "./views/Login/Login";
import AgendarTurno from "./views/AgendarTurno/AgendarTurno";
import About from "./views/About/About";
import Contact from "./views/Contact/Contact";
import NavBar from "./components/NavBar/NavBar";
import Register from "./views/Register/Register";
import SubirFoto from "./components/SubirFoto/SubirFoto";
import { UserContext } from "./context/UsersContext";

const App = () => {
  const { user, logOut } = useContext(UserContext);
  const navigate = useNavigate();

  const handleFinishIntro = () => {
    navigate("/login"); 
  };

  return (
    <>
   
      {user && <NavBar onLogout={logOut} />}

      <Routes>
      
        {!user && <Route path="/intro" element={<Intro onFinish={handleFinishIntro} />} />}

        
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/intro" replace />} />
          </>
        ) : (
          <>
            
            <Route path="/home" element={<Home />} />
            <Route path="/misturnos" element={<MisTurnos />} />
            <Route path="/agendarturno" element={<AgendarTurno />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/subirfoto" element={<SubirFoto />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </>
        )}
      </Routes>
    </>
  );
};


export default App;
