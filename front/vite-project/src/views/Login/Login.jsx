import React, { useState } from "react";
import Swal from "sweetalert2";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UsersContext";
import { useContext } from "react";

const Login = ({ onLogin }) => {

   const { loginUser } = useContext(UserContext)

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = "El usuario es requerido";
    if (!form.password) newErrors.password = "La contraseña es requerida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    try {
      
      await loginUser(form);
  
      
      Swal.fire({
        title: "¡Login Exitoso!",
        text: "Bienvenido a la plataforma.",
        icon: "success",
        confirmButtonText: "Aceptar",
        timer: 3000,
      });
  
      
      setForm({ username: "", password: "" });
      setErrors({});
      navigate("/home");
    } catch (error) {
      
      Swal.fire({
        title: "Error",
        text: error.message || "Ocurrió un error al iniciar sesión. Por favor, verifica tus credenciales.",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
      });
    }
  };
  

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.field}>
          <label>Usuario</label>
          <input
            type="text"
            name="username"
            className={styles.input}
            value={form.username}
            onChange={handleChange}
          />
          {errors.username && (
            <span className={styles.error}>{errors.username}</span>
          )}
        </div>
        <div className={styles.field}>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            className={styles.input}
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>
        <button className={styles.button} type="submit">
          Iniciar Sesión
        </button>
        <div className={styles.registerMessage}>
          ¿Eres nuevo?{" "}
          <span
            className={styles.registerText}
            onClick={() => navigate("/register")}
          >
            Regístrate
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
