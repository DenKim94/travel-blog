import styles from "@styles/root_page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1> Travel Blog: Ready to start! </h1>

      </main>
      <footer className={styles.footer}>
        <p> Placeholder-Footer </p>
      </footer>
    </div>
  );
}
