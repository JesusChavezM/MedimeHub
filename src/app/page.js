import Image from "next/image";
import styles from "../styles/landing.module.css";
import logo from "../assets/logo-landing.svg";
import LoginPage from "../components/login.jsx";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <div className={styles.logoImage}></div>
          <Image
            className={styles.bgImage}
            src={logo}
            width={70}
            height={70}
            alt="Logo"
          />
          <div className={styles.logoText}>MedimeHub</div>
        </div>
        <div className={styles.menu}>
          <div className={styles.menuItem}>Home</div>
          <div className={styles.menuItem}>About</div>
          <div className={styles.menuItem}>FAQ</div>
        </div>
        <div className={styles.loginContainer}>
          {/* Aquí deberías poner un enlace o un botón que dirija a la página de login */}
          <LoginPage />
          {/* <div className={styles.registerButton}>Register</div> */}
        </div>
      </div>
      <div className={styles.tagline}>
        Porque tu salud importa; Medimehub pone el control en tus manos, donde
        quiera que estés.
      </div>
      <div className={styles.heading}>
        <span className={styles.careAbout}>We Care About</span>
        <span className={styles.you}> You</span>
      </div>
    </div>
  );
}
