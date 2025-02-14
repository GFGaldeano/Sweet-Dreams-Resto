import React, { useState } from "react";
import axios from "axios";
import styles from "./SubirFoto.module.css";

const SubirFoto = () => {
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validFormats = ["image/jpeg", "image/png"];
    if (!validFormats.includes(file.type)) {
      alert("Solo se permiten archivos JPG o PNG.");
      return;
    }

    setPhoto(file);
  };

  const handleSave = async () => {
    if (!photo) {
      alert("Por favor, selecciona una foto.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("photoName", photo.name); 

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Hubo un problema al subir la foto. Intenta de nuevo.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Subir Foto</h2>
      <form>
        <div className={styles.inputContainer}>
          <label htmlFor="photo" className={styles.label}>
            Foto:
          </label>
          <input
            type="file"
            id="photo"
            accept=".jpg,.png"
            onChange={handlePhotoChange}
            className={styles.input}
          />
        </div>
        <button type="button" onClick={handleSave} className={styles.button}>
          Guardar
        </button>
      </form>
    </div>
  );
};

export default SubirFoto;
