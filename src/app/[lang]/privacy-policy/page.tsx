import * as appConstants from "@utils/appConstants";
import styles from "@styles/components/privacy-policy-page.module.scss";
import { getPrivacyPolicyData } from "@/lib/contentService";
import { DataNotFound } from "@/components/DataNotFound";
import { MarkdownTransformer } from "@/components/MarkdownTransformer"; 

export default async function PrivacyPolicyPage({ params }: 
  Readonly<{params: Promise<{lang: appConstants.SupportedLanguageType}>
}>) {
    const { lang } = await params;
    const privacyPolicyContent = await getPrivacyPolicyData(lang);
  
    if (!privacyPolicyContent) { 
        return <DataNotFound />;
    }

    return (
        <section className={styles.privacyPolicyPage}>
            <h1 className={styles.privacyPolicyTitle}>{privacyPolicyContent?.title}</h1>
            <MarkdownTransformer content={privacyPolicyContent?.content} textAlign="left" />
        </section>
    );
}