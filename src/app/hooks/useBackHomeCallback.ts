import { useRouter, useParams } from 'next/navigation';
import * as appConstants from "@utils/appConstants"

/**
 * Gibt eine Callback-Funktion zurück, die die Applikation zur Startseite
 * zurücksetzt. Die aktuelle Sprache wird dabei berücksichtigt.
 * @returns Eine Funktion, die die Applikation zur Startseite zurücksetzt.
 */
export function useBackToHomeCallback() {
  const router = useRouter();
  const params = useParams();

  // Hole die aktuelle Sprache aus den URL-Parametern
  const lang = params?.lang as string || appConstants.defaultLanguage; // Fallback auf die Standardsprache 

  return () => {
    router.push(`/${lang}`);
  };
}
