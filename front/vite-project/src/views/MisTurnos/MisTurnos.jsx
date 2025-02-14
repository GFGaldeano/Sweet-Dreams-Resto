import { useEffect, useState } from "react";
import styles from "./MisTurnos.module.css";
import Turno from "../../components/Turno/Turno";
import { useContext } from "react";
import { UserContext } from "../../context/UsersContext";

function MisTurnos() {

  const {userAppointments, getUserAppointments, user} =  useContext(UserContext);

  useEffect(() => {
    getUserAppointments(user);  
  }, [user, getUserAppointments]);

  return (
    <div className={styles.contenedor}>
      <div className={styles.contenedor}>
        <h1 className={styles.title}>Mis Reservas</h1>
      </div>

      <div className={styles.cardsContainer}>
        {userAppointments.length > 0 ? (
          userAppointments.map((turno) => {
            return (
              <Turno
                key={turno.id}
                id={turno.id}
                date={turno.date}
                time={turno.time}
                status={turno.status}
              />
            );
          })
        ) : (
          <h1 className={styles.title2}>No hay turnos disponibles</h1>
        )}
      </div>
    </div>
  );
}

export default MisTurnos;
