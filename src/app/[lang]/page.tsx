import styles from "@styles/root_page.module.scss";
import * as appConstants from "@utils/appConstants";
import { getLandingPageContent, getBlogPosts, getTravelMapData  } from "@/lib/contentService";
import { LandingPage } from "@/components/LandingPage";
import { TravelMap } from "@/components/TravelMap";


export default async function RootPage({ params }: Readonly<{params: Promise<{lang: appConstants.SupportedLanguageType}>
}>) {
  // await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate a delay

  const { lang } = await params;

  const [landingPageContent, travelMapContent ] = await Promise.all([
    getLandingPageContent(lang),
    getTravelMapData(lang)
  ]);

  return (
    <>
      <section id={appConstants.fallBackId} className={styles.section}>
        <LandingPage data={landingPageContent} />
      </section>
      <section id={appConstants.navigationIds.blogs} className={styles.section}>
        <h1 className={styles.h1}>{appConstants.navigationTitleTranslations[lang].blogs}</h1>
        <TravelMap data={travelMapContent} />
      </section>
      <section id={appConstants.navigationIds.about} className={styles.section}>
        <h1 className={styles.h1}>{appConstants.navigationTitleTranslations[lang].about}</h1>
      </section>
      <section id={appConstants.navigationIds.contact} className={styles.section}>
        <h1 className={styles.h1}>{appConstants.navigationTitleTranslations[lang].contact}</h1>
      </section>
    </>
  );
}
