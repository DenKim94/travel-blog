'use client';
import { JSX } from "react";
import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/blog-posts-container.module.scss";
import { useInView } from "@/hooks/useInView"; 
import { BlogPostCard } from "./BlogPostCard";
import { ContentNotFound } from "@/components/ContentNotFound"; 
import { BlogPostData } from '@/types/strapiTypes';


export function BlogPostsContainer({ data }: { data: Array<BlogPostData>| null }): JSX.Element {
    const [ref, isVisible] = useInView<HTMLDivElement>(appConstants.IN_VIEW_THRESHOLD);
    if (!data){return <ContentNotFound />}

    const tripleArray = Array(1).fill(data).flat(); // Test --> change "tripleArray" to "data"

    return (
        <div 
            ref={ref} 
            className={styles.blogPostsContainer} 
            id="blog-posts-container">
            
            {tripleArray.map((blogPostElement: BlogPostData, index) => {
                return <BlogPostCard key={index}
                                     data={blogPostElement} 
                                     styleProps={{ '--animation-order': index + 1 } as React.CSSProperties}
                                     startAnimation={isVisible} />            
            })}
        </div>
    )
}