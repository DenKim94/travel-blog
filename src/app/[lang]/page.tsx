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
 
  return (
    <>
      <section id={appConstants.fallBackId} className={styles.section}>
        <LandingPage data={landingPageContent} />
      </section>
      <section 
          id={appConstants.navigationIds.blogs} 
          className={`${styles.section} ${styles.responsiveHeight}`}>

        <h1 className={styles.h1}>{appConstants.navigationTitleTranslations[lang].blogs}</h1>
        <TravelMap data={travelMapContent} />
      </section>
      <section 
          id="blog-posts" 
          className={`${styles.section} ${styles.responsiveHeight}`}>
        <BlogPostsContainer data={blogPostsContent} />
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
