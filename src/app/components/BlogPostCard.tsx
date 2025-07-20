import { JSX, useState, useCallback } from "react";
import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/blog-post-card.module.scss";
import { ContentNotFound } from "@/components/ContentNotFound"; 
import { BlogPostData,  strapiLocaleType} from '@/types/strapiTypes';
import Image from 'next/image';

export function BlogPostCard({ data, styleProps, startAnimation }: { 
    data: BlogPostData, 
    styleProps?: React.CSSProperties,
    startAnimation?: boolean }): JSX.Element {

    const [isHovered, setIsHovered] = useState(false);
    // Memoize event handlers to prevent re-renders
    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    if (!data){return <ContentNotFound 
                        imgWidth={appConstants.notFoundImgDefaultSize/2} 
                        imgHeight={appConstants.notFoundImgDefaultSize/2}/>}

    const titleImage = data.featuredImages[appConstants.indexCardTitleImage]; // first image is the title image

    return(
        <div className={`${styles.blogPostCard} ${startAnimation ? styles['runAnimation'] : ''}`} 
            id="blog-post-card" 
            style={styleProps}>
            <div className={styles.blogPostCardContent}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                
                <div className={`${styles.blogPostImage} ${isHovered ? styles.imageHovered : ''}`}>
                    <Image 
                        src={titleImage.url} 
                        alt={titleImage.alternativeText || `${appConstants.BLOG_POST_ALT_TEXT} ${data.title}`} 
                        fill={true}
                        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                    /> 
                </div>      
                <div className={`${styles.titleButtonContainer} ${isHovered ? styles.flipped : ''}`}>
                    {/* Vorderseite: Titel */}
                    <div className={styles.titleSide}>
                        <p className={styles.title}>{data.title}</p>
                    </div>

                    <div className={styles.buttonSide}>
                        <button className={styles.readMoreButton}>
                           <p> {appConstants.blogCardButtonText[data.locale as strapiLocaleType]} </p> 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}