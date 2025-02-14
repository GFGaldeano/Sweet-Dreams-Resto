import styles from "./Turno.module.css";
import { formatDate } from "../../helpers/formatDate";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UserContext } from "../../context/UsersContext";

const Turno = ({ id, time, date, description, status }) => {
 
  const { cancelUserAppointment } = useContext(UserContext);

  const handleCancel = async () => {
    const today = new Date();
    const reservationDate = new Date(date);
    const yesterday = new Date(reservationDate);
    yesterday.setDate(reservationDate.getDate() - 1);
  
    if (today >= reservationDate) {
      Swal.fire({
        title: "No permitido",
        text: "No puedes cancelar una reserva el mismo día o después de la fecha reservada.",
        icon: "error",
      });
      return;
    }
  
    if (today > yesterday) {
      Swal.fire({
        title: "No permitido",
        text: "Solo puedes cancelar una reserva hasta el día anterior a la fecha reservada.",
        icon: "error",
      });
      return;
    }
  
    try {
      const confirmResult = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Se cancelará tu reserva.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, cancelar",
        cancelButtonText: "No, mantener",
      });
  
      if (confirmResult.isConfirmed) {
    
        const response = await cancelUserAppointment(id);
  
        if (response && response.status === 200) {
          Swal.fire({
            title: "¡Cancelado!",
            text: "Tu reserva ha sido cancelada con éxito.",
            icon: "success",
          });
        } else {
          throw new Error("No se pudo cancelar la reserva.");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "No se pudo cancelar la reserva. Inténtalo nuevamente.",
        icon: "error",
      });
    }
  };
  
  
  return (
    <div className={styles.turnoCard}>
      <div>
        <h3>Reserva: {id}</h3>
        <h4 className={styles.h4}>Hora: {time} hs</h4>
        <h4 className={styles.h4}>Fecha: {formatDate(date)}</h4>
        <h4 className={styles.h4}>{description}</h4>
        <h4 className={styles.turnoStatus}>{status.toUpperCase()}</h4>
        <button
          className={styles.cancelButton}
          disabled={status === "cancelled"}
          onClick={handleCancel}
        >
          Cancelar Turno
        </button>
      </div>
    </div>
  );
};

export default Turno;
