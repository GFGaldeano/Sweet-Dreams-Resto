import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/UsersContext";

const Register = () => {

 const { registerUser } = useContext(UserContext);



  const [form, setForm] = useState({
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const today = new Date();
    const birthDate = new Date(form.birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();

    if (!form.name) newErrors.name = "El nombre es requerido";
    if (!form.email) newErrors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "El email no es válido";
    if (!form.birthdate)
      newErrors.birthDate = "La fecha de nacimiento es requerida";
    else if (age < 18) newErrors.birthdate = "Debes tener al menos 18 años";
    if (!form.nDni) newErrors.nDni = "El DNI es requerido";
    else if (!/^\d{8}$/.test(form.nDni))
      newErrors.nDni = "El DNI debe tener 8 dígitos";
    if (!form.username) newErrors.username = "El username es requerido";
    else if (form.username.length < 6)
      newErrors.username = "El username debe tener al menos 6 caracteres";
    if (!form.password) newErrors.password = "La contraseña es requerida";
    else if (
      !/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/.test(
        form.password
      )
    ) {
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 número y 1 carácter especial";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

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
      const response = registerUser(form);

      Swal.fire({
        title: "¡Ya eres parte de nuestra plataforma!",
        text: "Preparate para disfrutar de la mejor experiencia de turnos online. Pronto te llegará un mail de bienvenida.",
        imageUrl: "/alien_dancing_1.gif",
        imageWidth: 400,
        imageHeight: 307,
        imageAlt: "Registro exitoso",
        confirmButtonText: "Aceptar",
        background: "#000",
        color: "#00ff00",
        customClass: {
          title: "swal-title",
          htmlContainer: "swal-text",
        },
      });



      setForm({
        name: "",
        email: "",
        birthdate: "",
        nDni: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});

     
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al registrar el usuario. Por favor, intenta de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Registro</h2>
      <div className={styles.field}>
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          className={styles.inputRegister}
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>
      <div className={styles.field}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          className={styles.inputRegister}
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>
      <div className={styles.field}>
        <label>Fecha de Nacimiento</label>
        <input
          type="date"
          name="birthdate"
          className={styles.inputRegister}
          value={form.birthdate}
          onChange={handleChange}
        />
        {errors.birthdate && (
          <span className={styles.error}>{errors.birthdate}</span>
        )}
      </div>
      <div className={styles.field}>
        <label>DNI</label>
        <input
          type="number"
          name="nDni"
          className={styles.inputRegister}
          value={form.nDni}
          maxLength="8"
          onChange={handleChange}
          // min="0"
        />
        {errors.nDni && <span className={styles.error}>{errors.nDni}</span>}
      </div>
      <div className={styles.field}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          className={styles.inputRegister}
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
          className={styles.inputRegister}
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password}</span>
        )}
      </div>
      <div className={styles.field}>
        <label>Confirmar Contraseña</label>
        <input
          type="password"
          name="confirmPassword"
          className={styles.inputRegister}
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <span className={styles.error}>{errors.confirmPassword}</span>
        )}
      </div>
      <button className={styles.button} type="submit">
        Registrar
      </button>
      <br />
      <div className={styles.loginMessage}>
        ¿Deseas logearte a la app?{" "}
        <span className={styles.loginText} onClick={() => navigate("/login")}>
          Logueate ahora
        </span>
      </div>
    </form>
  );
};

export default Register;
