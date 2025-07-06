"use client"
import Image from 'next/image';
import { JSX } from "react";
import * as appConstants from "@utils/appConstants"
import * as helperFunctions from "@utils/helperFunctions"
import styles from "@styles/components/landing-page.module.scss";
import {ContentNotFound} from "@/components/ContentNotFound"; 
import { LandingPageData, StrapiImage } from '@/types/strapiTypes';

export function LandingPage({ data }: { data: LandingPageData | null}): JSX.Element | null {

  const titleImageProps: StrapiImage | null = 
  data?.titleImages.find((img) => 
    helperFunctions.getLandingPageImagePropsByFormat(img, 'desktop')
  ) || null;
  
  console.log('titleImageProps', titleImageProps);

  return (
    <div className={styles.landingPageContainer} id="landing-page-container">
      {titleImageProps && 
        <div className={styles.imageContainer}>
          <Image src={titleImageProps.url} 
                  alt={titleImageProps.alternativeText || appConstants.LANDING_PAGE_ALT_TEXT} 
                  className={styles.landingPageImage}
                  fill={true}/>

            <div className={styles.titleOverlay}>
              <p className={styles.landingPageTitle} id="landing-page-title">
                {data?.title}
              </p>
            </div>
        </div>
      }{!titleImageProps && <ContentNotFound />}
    </div>
  );
}

