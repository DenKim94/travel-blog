import Image from 'next/image';
import { JSX } from "react";
import * as appConstants from "@utils/appConstants"
import * as helperFunctions from "@utils/helperFunctions"
import styles from "@styles/components/landing-page.module.scss";
import { DataNotFound } from "@/components/DataNotFound"; 
import { LandingPageData, StrapiImageFormat } from '@/types/strapiTypes';

/**
 * Die LandingPage-Komponente rendert die Startseite der Anwendung.
 *
 * Die Komponente akzeptiert ein Objekt mit den LandingPage-Daten als Prop
 * und rendert das Titel-Bild und den Titel-Text, wenn die Daten verfügbar
 * sind. 
 * Wenn keine Daten verfügbar sind, wird ein Platzhalter aus ContentNotFound gezeigt.
 *
 * @param {{ data: LandingPageData | null }} props - Die Props der Komponente.
 * @returns {JSX.Element} - Die gerenderte Komponente.
 */
export function LandingPage({ data }: { data: LandingPageData | null }): JSX.Element {

  const titleImageProps: StrapiImageFormat | null = helperFunctions.getImagePropsByFormat(data?.titleImages, 'original')

  return (
    <div className={styles.landingPageContainer} 
      data-testid="landing-page-container"
      id="landing-page-container">
      {titleImageProps && 
        <div className={styles.imageContainer}>
          <Image src={titleImageProps.url} 
                  alt={titleImageProps.alternativeText || appConstants.LANDING_PAGE_ALT_TEXT} 
                  className={styles.landingPageImage}
                  priority={true}
                  fill = {true}
                  />

            <div className={styles.titleOverlay}>
              <p className={styles.landingPageTitle}
                  data-testid="landing-page-title" 
                  id="landing-page-title"
                  aria-label="Landing Page Title">
                {data?.title}
              </p>
            </div>
        </div>
      }{!titleImageProps && <DataNotFound />}
    </div>
  );
}

