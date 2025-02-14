import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({
  user: null, 
  userAppointments: [],
  registerUser: async () => {},
  loginUser: async () => {},
  createdAppointments: async () => {},
  getUserAppointments: async () => {},
  logOut: () => {},
  cancelUserAppointment: async () => {}
});

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [userAppointments, setUserAppointments] = useState([]);

  
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const registerUser = async (userData) => {
    await axios.post("http://localhost:3000/users/register", userData);
  };

  const loginUser = async (loginData) => {
    try {
      const res = await axios.post("http://localhost:3000/users/login/", loginData);
      localStorage.setItem("user", res.data.user.id);
      setUser(res.data.user.id);
      return res.data; 
    } catch (error) {
      throw new Error("Credenciales inválidas"); 
    }
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null); 
    setUserAppointments([]);
  };

  const createdAppointments = async (values) => {
    await axios.post("http://localhost:3000/appointments/schedule", values);
  };

  const getUserAppointments = async (userId) => {
    const { data } = await axios.get(`http://localhost:3000/users/${userId}`);
    setUserAppointments(data.appointments);
  };

  const cancelUserAppointment = async (appointmentId) => {
    try {
      const response = await axios.put(`http://localhost:3000/appointments/cancel/${appointmentId}`);
      
      if (response.status === 200) {
        const newAppointments = userAppointments.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: "cancelled" }
            : appointment
        );
        setUserAppointments(newAppointments);
      }
  
      return response; 
    } catch (error) {
      throw error; 
    }
  };
  

  const value = {
    user,
    userAppointments,
    registerUser,
    loginUser,
    logOut,
    createdAppointments,
    getUserAppointments,
    cancelUserAppointment
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
