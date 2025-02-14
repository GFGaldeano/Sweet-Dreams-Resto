import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PROYECTO MÓDULO 3</h1>
      <h2 className={styles.subtitle}>Sistema de Reserva para Restaurant</h2>
      <p className={styles.description}>
        <strong>Descripción:</strong>
      </p>
      <p className={styles.text}>
        El sistema tiene como fin ofrecer al usuario hacer reservas, tanto para almuerzo y/o cena
        en un restaurante.
      </p>
      <p className={styles.text}>
        Para ello, el sistema provee al usuario una interfaz intuitiva para registrarse y
        posteriormente loguearse.
      </p>
      <p className={styles.text}>
        Así mismo, el usuario puede agendar su reserva, ver el historial de sus reservas pasadas y
        futuras, y también cuenta con la opción de cancelar las mismas.
      </p>
      <h3 className={styles.sectionTitle}>Tecnologías usadas en el proyecto:</h3>
      <div className={styles.techList}>
        <h4>FRONTEND:</h4>
        <ul>
          <br />
          <li>React</li>
          <br />
          <li>Vite</li>
          <br />
        </ul>
        <h4>BACKEND:</h4>
        <ul>
          <br />
          <li>Express</li>
          <br />
          <li>TypeORM</li>
        </ul>
        <br />
        <h4>DATABASE:</h4>
        <ul>
          <br />
          <li>PostgreSQL</li>
        </ul>
      </div>
      <footer className={styles.footer}>
        (Proyecto del curso Full Stack Developer – Todos los derechos reservados para HENRY)
      </footer>
    </div>
  );
};

export default About;
