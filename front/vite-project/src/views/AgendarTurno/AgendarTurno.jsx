import React, { useState } from "react";
import styles from "./AgendarTurno.module.css";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UsersContext";
import { useContext } from "react";

const AgendarTurno = () => {

  const { createdAppointments, user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({
    date: "",
    time: "",
  });

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; 
  };

  const validateForm = () => {
    const currentErrors = {};
    const now = new Date();
    const selectedDate = new Date(`${formData.date}T00:00:00`);
    const selectedTime = formData.time;

    if (selectedDate < new Date(now.toDateString())) {
      currentErrors.date = "No se pueden agendar citas en fechas pasadas.";
    }

    
    const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
    const diffInHours = (selectedDateTime - now) / (1000 * 60 * 60);
    if (diffInHours < 24) {
      currentErrors.date = "Las citas deben ser agendadas con al menos 24 horas de antelación.";
    }

    
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      currentErrors.date = "No se pueden agendar citas los fines de semana.";
    }

    
    const [hours] = selectedTime.split(":").map(Number);
    if (!((hours >= 12 && hours < 14) || (hours >= 21 && hours < 23))) {
      currentErrors.time = "El horario debe ser entre las 12:00 y 14:00 o entre las 21:00 y 23:00.";
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const valuesObjet ={
          ...formData,
          userId: user
        }
        
        const response = createdAppointments(valuesObjet);

  
        if (response.status === 200 || response.status === 201 || response.status === undefined) {
          Swal.fire({
            title: "¡Reserva exitosa!",
            text: "Tu reserva ha sido creada correctamente.",
            icon: "success",
          });

          setFormData({
            date: "",
            time: "",
          });
        }
      } catch (error) {

        Swal.fire({
          title: "Error",
          text: "Ocurrió un problema al guardar la reserva. Inténtalo nuevamente.",
          icon: "error",
        });
        console.error("Error al guardar la reserva:", error);
      } 
    }
  };

  return (
    <div className={styles.containerAgendarTurno}>
      <h1 className={styles.title}>Reservas</h1>
      <div className={styles.container}>
      <p className={styles.description}>
        Bienvenido al sistema de reservas. Aquí puedes seleccionar un horario
        que se ajuste a tus necesidades. Recuerde que los horarios para reservar
        son de 12:00 a 14:00 para el almuerzo y de 21:00 a 23:00 para la cena.
      </p>
      </div>
      <form className={styles.formAgendarTurno} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="date" className={styles.label}>
            Fecha de la reserva:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className={styles.input}
            value={formData.date}
            onChange={handleChange}
            min={getTodayDate()}
          />
          {errors.date && <p className={styles.error}>{errors.date}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="time" className={styles.label}>
            Hora de la reserva:
          </label>
          <input
            type="time"
            id="time"
            name="time"
            className={styles.input}
            value={formData.time}
            onChange={handleChange}
          />
          {errors.time && <p className={styles.error}>{errors.time}</p>}
        </div>
        <button type="submit" className={styles.button}>
          Reservar
        </button>
      </form>
    </div>
  );
};

export default AgendarTurno;
