"use client"
import Image from 'next/image';
import { JSX } from "react";
import * as appConstants from "@utils/appConstants"
import * as helperFunctions from "@utils/helperFunctions"
import { LandingPageData, StrapiImage } from '@/types/strapiTypes';

export function LandingPage({ data }: { data: LandingPageData | null}): JSX.Element | null {
  if (!data) {
    return null;
  }

  const titleImageProps: StrapiImage | null = 
  data.titleImages.find((img) => 
    helperFunctions.getLandingPageImagePropsByFormat(img, 'desktop')
  ) || null;
  
  console.log('titleImageProps', titleImageProps);

  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
}

