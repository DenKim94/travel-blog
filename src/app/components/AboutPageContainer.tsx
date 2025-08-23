import * as appConstants from "@utils/appConstants";
import styles from "@styles/components/about-page.module.scss"
import { DataNotFound } from "@/components/DataNotFound"; 
import { AboutPageData } from '@/types/strapiTypes';
import { MarkdownTransformer } from "./MarkdownTransformer"; 
import { JSX } from "react";
import Image from 'next/image';

export function AboutPageContainer({ data }: { data: AboutPageData | null }): JSX.Element {
    if (!data) return <DataNotFound />;
    const { titleImage, profileImage, description } = data;

    return (
        <section className={styles.aboutPageContainer}>
            {titleImage?.url && (
                <div className={styles.titleImageContainer}>
                <Image
                    src={titleImage.url}
                    alt={titleImage.alternativeText || appConstants.ABOUT_PAGE_ALT_TEXT}
                    fill={true}
                    sizes={appConstants.imgDefaultSizes}
                    priority={true}           /* Above-the-fold → kein Lazy Loading  */
                    className={styles.titleImage}
                />
                </div>
            )}
            {profileImage?.url && (
                <div className={styles.profileImageContainer}>
                <Image
                    src={profileImage.url}
                    alt={profileImage.alternativeText || appConstants.PROFILE_IMAGE_ALT_TEXT}
                    fill
                    sizes="(max-width: 768px) 120px, 180px"
                    className={styles.profileImage}
                />
                </div>
            )}
            <div className={styles.descriptionContainer}>
                <MarkdownTransformer content={description} alignContent="right" />
            </div>
        </section>
    );
}