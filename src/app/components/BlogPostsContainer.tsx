import { JSX } from "react";
import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/blog-posts-container.module.scss";
import { ContentNotFound } from "@/components/ContentNotFound"; 
import { BlogPostData } from '@/types/strapiTypes';

export function BlogPostsContainer({ data }: { data: Array<BlogPostData>| null }): JSX.Element {
    console.log("@blogPostsContainer.data: ", data);

    return (
        <div className={styles.blogPostsContainer} id="blog-posts-container">

        </div>
    );
}