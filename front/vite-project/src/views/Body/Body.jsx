import React from "react";
import styles from "./Body.module.css"; 

const Body = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
      <h1 className={styles.h1}>¡Bienvenido al Restaurante!</h1>
    </div>
  );
};

export default Body;
