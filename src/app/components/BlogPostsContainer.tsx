'use client';
import { JSX } from "react";
import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/blog-posts-container.module.scss";
import { useInView } from "@/hooks/useInView"; 
import { BlogPostCard } from "./BlogPostCard";
import { DataNotFound } from "@/components/DataNotFound"; 
import { BlogPostListData } from '@/types/strapiTypes';


export function BlogPostsContainer({ data }: { data: Array<BlogPostListData> | null }): JSX.Element {
    const [ref, isVisible] = useInView<HTMLDivElement>(appConstants.IN_VIEW_THRESHOLD);
    
    if (!data){return <DataNotFound />}

    return (
        <div 
            ref={ref} 
            className={styles.blogPostsContainer} 
            id="blog-posts-container">
            
            {data.map((blogPostElement: BlogPostListData, index) => {
                return <BlogPostCard key={index}
                                     data={blogPostElement} 
                                     styleProps={{ '--animation-order': index + 1 } as React.CSSProperties}
                                     startAnimation={isVisible} />            
            })}
        </div>
    )
}