import React, { useEffect } from "react";
import styles from "./Contact.module.css";

const About = () => {
  useEffect(() => {
    const audio = document.getElementById("myAudio2");
    if (audio) {
      audio.play().catch((error) => {
        console.error("Error al reproducir el audio:", error);
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      
      <div className={styles.gifBackground}></div>

      
      <div className={styles.content}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="/yo.png"
              className={`${styles.imgFluid}`}
              alt="Foto redondeada"
            />
          </div>
          <div className="col-md-8 mt-5">
            <div className="card-body text-light">
              <h1 className={styles.title}>GUSTAVO FEDERICO GALDEANO</h1>
              <h5 className={styles.subtitle}>
                INGENIERO EN SISTEMAS DE INFORMACIÓN - UTN
              </h5>
              <h5 className={styles.subtitle}>
                PROFESOR UNIVERSITARIO EN COMPUTACIÓN - UNCA
              </h5>
              <h5 className={styles.subtitle}>
                DIPLOMADO EN DELITOS INFORMATICOS Y FORENCIA DIGITAL - UTN
              </h5>
              <h5 className={styles.subtitle}>DBA ORACLE - PROYDESA</h5>
              <h5 className={styles.subtitle}>
                EDITOR PROFESIONAL DE AUDIO Y VIDEO
              </h5>
              <h5 className={styles.subtitle2}>
                WEB SITE:{" "}
                <a 
                  href="http://www.dragonpyramid.com.ar"
                  target="_blank"
                  rel="noopener noreferrer" 
                  style={{ color: "#ffffff", textDecoration: "underline" }}
                >
                  www.dragonpyramid.com.ar
                </a>
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* Audio */}
      <audio id="myAudio2" preload="auto">
        <source src="/sirius_me.mp3" type="audio/mp3" />
        Tu navegador no soporta el audio.
      </audio>
    </div>
  );
};

export default About;
