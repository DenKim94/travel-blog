import styles from "@styles/root_page.module.scss";
// import * as appConstants from "@utils/appConstants";

export default function RootPage() {

  return (
    <>
    {/* To-Do: Erstellen und Einfügen einzelner Abschnitte */}
    
      <section id="home" className={styles.section}>
        {/* Landingpage-Inhalt */}
        <h1>Willkommen auf meinem Reiseblog</h1>
      </section>
      <section id="blogs" className={styles.section}>
        <h1>Meine Reisen</h1>
      </section>
      <section id="about" className={styles.section}>
        <h1>Über mich</h1>
      </section>
    </>
  );
}
