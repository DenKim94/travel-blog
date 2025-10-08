import { JSX, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from '@context/GlobalStateContext';
import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/blog-post-card.module.scss";
import { DataNotFound } from "@/components/DataNotFound"; 
import { BlogPostListData,  strapiLocaleType} from '@/types/strapiTypes';
import Image from 'next/image';

export function BlogPostCard({ data, styleProps, startAnimation }: { 
    data: BlogPostListData, 
    styleProps?: React.CSSProperties,
    startAnimation?: boolean }): JSX.Element {

    const [isHovered, setIsHovered] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const router = useRouter();
    const { language } = useGlobalState();
        
    // Memoize event handlers to prevent re-renders
    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    const handleReadMore = useCallback(() => {

        if (!data?.title) {
            console.error('Blog post ID is missing');
            return;
        }
        
        try {
            const blogUrl = `/${language}/blogs/${data.title}`;
            router.push(blogUrl);

        } catch (error) {
            console.error('Navigation failed:', error);
        }
    }, [data?.title, language, router]);

    const handleImageLoad = useCallback(() => {
        setImageLoading(false);
    }, []);

    if (!data){return <DataNotFound 
                        imgWidth={appConstants.notFoundImgDefaultSize/2} 
                        imgHeight={appConstants.notFoundImgDefaultSize/2}/>}

    const titleImage = data.featuredImage;

    return(
        <div className={`${styles.blogPostCard} ${startAnimation ? styles['runAnimation'] : ''}`} 
            id="blog-post-card" 
            style={styleProps}>
            <div className={styles.blogPostCardContent}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleReadMore}>
                
                <div className={`${styles.blogPostImage} ${isHovered ? styles.imageHovered : ''}`}>
                    {imageLoading && (
                        <div className={styles.loaderContainer}>
                            <div className={styles.loader}></div>
                        </div>
                    )}
                    <Image 
                        src={titleImage.url} 
                        alt={titleImage.alternativeText || `${appConstants.BLOG_POST_ALT_TEXT} ${data.title}`} 
                        fill={true}
                        priority={true}                
                        sizes={appConstants.imgDefaultSizes}
                        style={{ objectFit: 'cover' }}
                        onLoadingComplete={handleImageLoad}
                    /> 
                </div>      
                <div className={`${styles.titleButtonContainer} ${isHovered ? styles.flipped : ''}`}>
                    {/* Vorderseite: Titel */}
                    <div className={styles.titleSide}>
                        <p className={styles.title}>{data.title}</p>
                    </div>

                    <div className={styles.buttonSide}>
                        <button className={styles.readMoreButton}
                                onClick={handleReadMore}
                                aria-label={`${appConstants.blogCardButtonText[data.locale as strapiLocaleType]} - ${data.title}`}>
                           <p> {appConstants.blogCardButtonText[data.locale as strapiLocaleType]} </p> 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}