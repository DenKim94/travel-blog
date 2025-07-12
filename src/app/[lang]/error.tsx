'use client';

import { useParams } from 'next/navigation';
import GenericButton from "@components/GenericButton";
import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/error.module.scss";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const params = useParams();
  const lang = typeof params.lang === 'string' ? params.lang : Array.isArray(params.lang) ? params.lang[0] : 'de';
  const messages = appConstants.errorNotificationTranslations[lang] || appConstants.errorNotificationTranslations[appConstants.defaultLanguage];

  return (
    <div className={styles.errorContainer}>
      <h1>{messages.title}</h1>
      <p>{error.message}</p>
      <GenericButton
        title={messages.retry}
        onClick={reset}
        classname={styles.retryButton}
      />
    </div>
  );
}
