'use client';
import { JSX } from "react";
import styles from "@styles/components/search-results-board.module.scss";
import { BlogPostCard } from "./BlogPostCard";
import { BlogPostData } from '@/types/strapiTypes';


export function FoundBlogPostsContainer({ data }: { data: Array<BlogPostData> | null }): JSX.Element | null {

    if (!data){return null}

    return (
        <div className={`${styles.foundBlogPostsContainer} ${(data.length > 1) ? '' : styles['singleCard']}`}
            id="found-blog-posts-container">
            {data.map((blogPostElement: BlogPostData, index) => {
                return <BlogPostCard key={index}
                                     data={blogPostElement} 
                                     styleProps={{ '--animation-order': index + 1 } as React.CSSProperties}
                                     startAnimation={true} />            
            })}
        </div>
    )
}