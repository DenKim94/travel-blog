'use client';

import { useParams } from 'next/navigation';
import * as appConstants from "@utils/appConstants"
import GenericButton from "@components/GenericButton";
import { useBackToHomeCallback } from '@hooks/useBackHomeCallback';
import styles from "@styles/components/not-found.module.scss";
  
export default function NotFound() {
  const params = useParams();
  const lang = params.lang as string; 

  const backToHome = useBackToHomeCallback();

  return (
    <div className={styles.notFound}>
      <h1>{appConstants.notFoundTranslations[lang].title}</h1>
      <p>{appConstants.notFoundTranslations[lang].description}</p>
      <GenericButton
        title={appConstants.notFoundTranslations[lang].backToHome}
        onClick={backToHome}
      />
    </div>
  );
}