import Head from "next/head";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (

    <div className={`${styles.container} ${styles.diagonal}`}>
      <Head>
        <title>MedimeHub - Tu plataforma integral de gestión de salud</title>
        <meta name="description" content="Gestiona tus expedientes médicos y recetas de manera integral con MedimeHub." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Bienvenido a <span className={styles.highlight}>MedimeHub</span>
          </h1>
          <p className={styles.subtitle}>
            Tu plataforma integral de gestión de salud
          </p>
          <p className={styles.description}>
            Con MedimeHub, puedes gestionar tus expedientes médicos y recetas de manera fácil y segura. ¡Únete a nosotros y descubre una nueva forma de cuidar tu salud!
          </p>
        </div>

        <div className={styles.grid}>
          <Link href="/login">
            <div className={styles.card}>
              <h3>Iniciar sesión →</h3>
              <p>Accede a tu cuenta de MedimeHub</p>
            </div>
          </Link>

          <Link href="/register">
            <div className={styles.card}>
              <h3>Registrarse →</h3>
              <p>Únete a MedimeHub hoy mismo</p>
            </div>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>MedimeHub - Todos los derechos reservados</p>
        <p>Hecho con ❤️ para nuestros usuarios</p>
      </footer>

    </div>
  );
}
