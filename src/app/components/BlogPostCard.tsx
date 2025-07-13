import { JSX } from "react";
// import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/blog-post-card.module.scss";
import { ContentNotFound } from "@/components/ContentNotFound"; 
import { BlogPostData } from '@/types/strapiTypes';

export function BlogPostCard({ data }: { data: BlogPostData }): JSX.Element {
    if (!data){return <ContentNotFound imgWidth={160} imgHeight={160}/>}

    return(
        <div className={styles.blogPostCard} id="blog-post-card">
            <p>{data.title}</p>
        </div>
    );
}