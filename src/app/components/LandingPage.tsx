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
 * Das Titelbild liegt vollflächig im Container, darüber liegt ein Verlauf
 * (Scrim), damit der Claim auf jedem Motiv lesbar bleibt. Im unteren Bereich
 * stehen Tagline, Claim und zwei Einstiegspunkte in die Seite.
 *
 * Alle Texte stammen aus dem CMS bzw. aus den vorhandenen Übersetzungen,
 * damit die Sprachumschaltung vollständig greift.
 *
 * @param {{ data: LandingPageData | null, lang: appConstants.SupportedLanguageType }} props - Die Props der Komponente.
 * @returns {JSX.Element} - Die gerenderte Komponente.
 */
export function LandingPage({ data, lang }: {
    data: LandingPageData | null,
    lang: appConstants.SupportedLanguageType }): JSX.Element {

  const titleImageProps: StrapiImageFormat | null = helperFunctions.getImagePropsByFormat(data?.titleImages, 'original')
  const tagline: string | undefined = appConstants.metadataTranslations[lang]?.description;
  const navigationTitles = appConstants.navigationTitleTranslations[lang];

  return (
    <div className={styles.landingPageContainer}
      data-testid="landing-page-container"
      id="landing-page-container">
      {titleImageProps &&
        <>
          <div className={styles.imageContainer}>
            <Image src={titleImageProps.url}
                    alt={titleImageProps.alternativeText || appConstants.LANDING_PAGE_ALT_TEXT}
                    className={styles.landingPageImage}
                    priority={true}
                    fill = {true}
                    data-testid="landing-page-image"
                    />

            <div className={styles.scrim} aria-hidden="true" />

            <div className={styles.titleOverlay}>
              {tagline && <span className={styles.eyebrow}>{tagline}</span>}

              <p className={styles.landingPageTitle}
                  data-testid="landing-page-title"
                  id="landing-page-title"
                  aria-label="Landing Page Title">
                {data?.title}
              </p>

              <div className={styles.ctaRow}>
                <a href={`#${appConstants.navigationIds.blogs}`}
                   className={styles.ctaPrimary}
                   data-testid="landing-page-cta-blogs">
                  {navigationTitles?.blogs}
                </a>
                <a href={`#${appConstants.navigationIds.about}`}
                   className={styles.ctaSecondary}
                   data-testid="landing-page-cta-about">
                  {navigationTitles?.about}
                </a>
              </div>
            </div>
          </div>

          <div className={styles.scrollHint} aria-hidden="true">
            <span className={styles.scrollHintRule} />
            <span className={styles.scrollHintLabel}>{appConstants.scrollHintLabel[lang]}</span>
            <span className={styles.scrollHintRule} />
          </div>
        </>
      }{!titleImageProps && <DataNotFound />}
    </div>
  );
}
