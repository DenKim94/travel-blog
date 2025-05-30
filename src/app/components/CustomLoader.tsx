import Image from 'next/image';
import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/loader.module.scss";

export function CustomLoader() {
  return (
    <div className={styles.customLoader}>
      <span className={styles.spinner}></span>
      <div className={styles.logoWrapper}>
        <Image
          src={appConstants.appLogoImageProps.src}
          alt="Loading Icon"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
