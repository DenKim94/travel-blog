'use client';
import { JSX } from "react";
import styles from "@styles/components/blog-post-content.module.scss";
import * as appConstants from "@utils/appConstants"
import { DataNotFound } from "@/components/DataNotFound"; 
import { BlogPostData } from '@/types/strapiTypes';
import { ImageCarousel } from "./ImageCarousel"; 
import GenericButton from "@components/GenericButton";
import { MarkdownTransformer } from "./MarkdownTransformer"; 
import { useBackToHomeCallback } from '@hooks/useBackHomeCallback';
import { useGlobalState } from "@/context/GlobalStateContext";

export function BlogPostContent({ data }: { data: BlogPostData | null }): JSX.Element {
    const backToHome = useBackToHomeCallback();
    const { language } = useGlobalState();
    const buttonstyle = {
        width: '250px',
        marginTop: '0px',
        marginBottom: '20px',
    };

    if (!data) {
        return <DataNotFound />;
    }
    
    return (
        <div className={styles.blogPostContentContainer} id="blog-post-content-container">
            <article key={data.id} className={styles.blogPost}>
                <ImageCarousel images={data.featuredImages} />
                <MarkdownTransformer content={data.description} />
            </article>
            <GenericButton
                title={appConstants.notFoundTranslations[language].backToHome}
                onClick={backToHome}
                style={buttonstyle}
            />
        </div>
    );
} 