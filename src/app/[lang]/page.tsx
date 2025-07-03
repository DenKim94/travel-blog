import styles from "@styles/root_page.module.scss";
import * as appConstants from "@utils/appConstants";
import { getLandingPageContent, getBlogPosts, getAboutContent } from "@/lib/contentService";

export default async function RootPage() {
  // await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate a delay

  return (
    <>
    {/* To-Do: Erstellen und Einfügen einzelner Abschnitte */}

      <section id={appConstants.fallBackId} className={styles.section}>
        {/* Landingpage-Inhalt */}
        <h1>Willkommen auf meinem Reiseblog</h1>
      </section>
      <section id={appConstants.navigationIds.blogs} className={styles.section}>
        <h1>Meine Reisen</h1>
      </section>
      <section id={appConstants.navigationIds.about} className={styles.section}>
        <h1>Über mich</h1>
      </section>
    </>
  );
}
