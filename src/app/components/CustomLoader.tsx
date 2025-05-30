import Image from 'next/image';
import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/loader.module.scss";
import variables from "@styles/components/loader.module.scss";

export function CustomLoader() {
  const logoSize: number = parseInt(variables.customLoaderLogoSize, 10) || 100; // Fallback auf 100, falls die Variable nicht gesetzt ist

  return (
    <div className={styles.customLoader}>
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
