import * as appConstants from "@utils/appConstants";
import styles from "@styles/components/about-page.module.scss"
import { DataNotFound } from "@/components/DataNotFound";
import { AboutPageData } from '@/types/strapiTypes';
import { MarkdownTransformer } from "./MarkdownTransformer";
import { JSX } from "react";
import Image from 'next/image';

/**
 * Rendert die "Über mich"-Sektion.
 *
 * Aufbau: Bildstreifen, darunter eine Zeile aus Profilbild und Fließtext.
 * Das Profilbild ragt über eine negative Außenabstand-Angabe in den
 * Bildstreifen hinein und bleibt dabei im normalen Textfluss.
 *
 * Der Beschreibungstext hat bewusst keinen eigenen Scroll-Container mehr –
 * er fließt frei, die Sektion wächst mit ihrem Inhalt.
 */
export function AboutPageContainer({ data }: { data: AboutPageData | null }): JSX.Element {
    if (!data) return <DataNotFound />;
    const { titleImage, profileImage, description } = data;

    return (
        <section className={styles.aboutPageContainer} data-testid="about-page-container">
            {titleImage?.url && (
                <div className={styles.titleImageContainer}>
                    <Image
                        src={titleImage.url}
                        alt={titleImage.alternativeText || appConstants.ABOUT_PAGE_ALT_TEXT}
                        fill={true}
                        sizes={appConstants.imgDefaultSizes}
                        priority={true}
                        className={styles.titleImage}
                        data-testid="about-page-title-image"
                    />
                    <div className={styles.scrim} aria-hidden="true" />
                </div>
            )}

            <div className={styles.aboutBody}>
                {profileImage?.url && (
                    <div className={styles.profileImageContainer}>
                        <Image
                            src={profileImage.url}
                            alt={profileImage.alternativeText || appConstants.PROFILE_IMAGE_ALT_TEXT}
                            fill
                            sizes="(max-width: 720px) 160px, 200px"
                            className={styles.profileImage}
                            priority={true}
                            data-testid="about-page-profile-image"
                        />
                    </div>
                )}

                <div className={styles.descriptionContainer} data-testid="about-page-description">
                    <MarkdownTransformer content={description} textAlign="left" alignContent="left" />
                </div>
            </div>
        </section>
    );
}
