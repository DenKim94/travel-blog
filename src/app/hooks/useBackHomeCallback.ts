import { useRouter, useParams } from 'next/navigation';
import * as appConstants from "@utils/appConstants"

export function useBackToHomeCallback() {
  const router = useRouter();
  const params = useParams();

  // Hole die aktuelle Sprache aus den URL-Parametern
  const lang = params?.lang as string || appConstants.defaultLanguage; // Fallback auf die Standardsprache 

  return () => {
    router.push(`/${lang}`);
  };
}
