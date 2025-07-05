import styles from "@styles/root_page.module.scss";
import * as appConstants from "@utils/appConstants";
import { getLandingPageContent, getBlogPosts, getAboutPageContent  } from "@/lib/contentService";
import { LandingPage } from "@/components/LandingPage";


export default async function RootPage({ params }: Readonly<{params: Promise<{lang: appConstants.SupportedLanguageType}>
}>) {
  // await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate a delay

  const { lang } = await params;

  // const [landingPageContent, blogPostContent, aboutPageContent] = await Promise.all([
  //   getLandingPageContent(lang),
  //   getBlogPosts(lang),
  //   getAboutPageContent(lang)
  // ]);

  const landingPageContent = await getLandingPageContent(lang);
  console.log(" >> Landing Page Content:", landingPageContent);

  return (
    <>
    {/* To-Do: Erstellen und Einfügen einzelner Abschnitte */}

      <section id={appConstants.fallBackId} className={styles.section}>
        {/* Landingpage-Inhalt */}
        <LandingPage data={landingPageContent} />
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
