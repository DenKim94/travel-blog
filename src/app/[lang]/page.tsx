import styles from "@styles/root_page.module.scss";
import * as appConstants from "@utils/appConstants";
import { getLandingPageContent, getBlogPosts, getTravelMapData  } from "@/lib/contentService";
import { LandingPage } from "@/components/LandingPage";
import { TravelMap } from "@/components/TravelMap";
import { BlogPostsContainer } from "@/components/BlogPostsContainer";


export default async function RootPage({ params }: Readonly<{params: Promise<{lang: appConstants.SupportedLanguageType}>
}>) {
  const { lang } = await params;

  // await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate a delay

  const [landingPageContent, travelMapContent, blogPostsContent ] = await Promise.all([
    getLandingPageContent(lang),
    getTravelMapData(lang),
    getBlogPosts(lang)
  ]);

  // Test-Abschnitt
  const testStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgrey'
  };
  
  return (
    <>
      <section id={appConstants.fallBackId} className={styles.section}>
        <LandingPage data={landingPageContent} />
      </section>
      <section id={appConstants.navigationIds.blogs} className={styles.section}>
        <h1 className={styles.h1}>{appConstants.navigationTitleTranslations[lang].blogs}</h1>
        <TravelMap data={travelMapContent} />
      </section>
      <section id={appConstants.navigationIds.blogs} className={styles.section}>
        <div style={testStyle}>
            <h1>Platzhalter-Testabschnitt</h1>
            <BlogPostsContainer data={blogPostsContent} />
        </div>
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
