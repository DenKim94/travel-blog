import { JSX } from "react";
// import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/blog-posts-container.module.scss";
import { BlogPostCard } from "./BlogPostCard";
import { ContentNotFound } from "@/components/ContentNotFound"; 
import { BlogPostData } from '@/types/strapiTypes';


export function BlogPostsContainer({ data }: { data: Array<BlogPostData>| null }): JSX.Element {
    if (!data){return <ContentNotFound />}
 
    const tripleArray = Array(4).fill(data).flat(); // Test --> change "tripleArray" to "data"

    return (
        <div className={styles.blogPostsContainer} id="blog-posts-container">
            {tripleArray.map((blogPostElement: BlogPostData, index) => {
                return <BlogPostCard key={index} data={blogPostElement} />            
            })}
        </div>
    )
}