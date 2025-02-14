import { useState } from "react";
import styles from "./NavBar.module.css";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UsersContext";
import { useContext } from "react";

const NavBar = () => {
  const navigate = useNavigate();

  const { logOut } = useContext(UserContext)

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAvatarClick = () => {
    logOut();
    Swal.fire({
      icon: "warning",
      title: "Tu sesion fue cerrada correctamente",
    })
    navigate("/login"); 
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoSection}>
        <img src={logo} alt="Logo" />
      </div>
      <div
        className={`${styles.linksSection} ${
          isMenuOpen ? styles.showMenu : ""
        }`}
      >
        <Link to="/home" className={styles.navLink}>HOME</Link>
        <Link to="/misturnos" className={styles.navLink}>MIS RESERVAS</Link>
        <Link to="/agendarturno" className={styles.navLink}>AGENDAR RESERVA</Link>
        <Link to="/subirfoto" className={styles.navLink}>FOTO DE PERFIL</Link>
        <Link to="/about" className={styles.navLink}>A CERCA</Link>
        <Link to="/contact" className={styles.navLink}>CONTACTO</Link>
      </div>
      <div className={styles.avatarSection}>
        <img
          src={avatar}
          alt="Avatar"
          onClick={handleAvatarClick}
          className={styles.avatarClickable}
          title="Cerrar sesión"
        />
      </div>
     
      <div className={styles.menuToggle} onClick={toggleMenu}>
        ☰
      </div>
    </div>
  );
};

export default NavBar;
