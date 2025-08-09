'use client';
import { JSX } from "react";
import styles from "@styles/components/blog-post-content.module.scss";
// import * as appConstants from "@utils/appConstants"
import { ContentNotFound } from "@/components/ContentNotFound"; 
import { BlogPostData } from '@/types/strapiTypes';

export function BlogPostContent({ data }: { data: BlogPostData | null }): JSX.Element {
    if (!data) {
        return <ContentNotFound />;
    }

    return (
        <div>
            <article key={data.id} className={styles.blogPost}>
                <p>{data.description}</p>
            </article>
        </div>
    );
} 