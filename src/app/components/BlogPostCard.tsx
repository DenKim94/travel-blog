import { JSX } from "react";
// import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/blog-post-card.module.scss";
import { ContentNotFound } from "@/components/ContentNotFound"; 
import { BlogPostData } from '@/types/strapiTypes';

export function BlogPostCard({ data, styleProps, startAnimation }: { 
    data: BlogPostData, 
    styleProps?: React.CSSProperties,
    startAnimation?: boolean }): JSX.Element {

    if (!data){return <ContentNotFound imgWidth={160} imgHeight={160}/>}

    return(
        <div className={`${styles.blogPostCard} ${startAnimation ? styles['runAnimation'] : ''}`} 
            id="blog-post-card" 
            style={styleProps}>
                
            <p>{data.title}</p>
        </div>
    );
}