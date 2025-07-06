import Image from 'next/image';
import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/loader.module.scss";
import variables from "@styles/components/loader.module.scss";

/**
 * CustomLoader-Komponente: Eine benutzerdefinierte Ladeanimation.
 *
 * Die Komponente rendert eine animierte kreisförmige Ladeanimation
 * mit dem Logo in der Mitte.
 *
 * Die Größe des Logos wird dynamisch anhand der Variablen
 * `customLoaderLogoSize` in `variables.module.scss` bestimmt.
 * Falls diese Variable nicht gesetzt ist, wird ein Fallback auf 100
 * Pixel verwendet.
 *
 * @returns {JSX.Element} Die gerenderte CustomLoader-Komponente.
 */
export function CustomLoader() {
  const logoSize: number = parseInt(variables.customLoaderLogoSize, 10) || 100; // Fallback auf 100, falls die Variable nicht gesetzt ist

  return (
    <div className={styles.customLoader} id='custom-loader-container'>
      <span className={styles.spinner}></span>
      <div className={styles.logoWrapper}>
        <Image
          src={appConstants.appLogoImageProps.src}
          alt="Loading Icon"
          width={logoSize}
          height={logoSize}
        />
      </div>
    </div>
  );
}
