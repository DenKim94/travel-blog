'use client'
import { StrapiImage } from '@/types/strapiTypes';
import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/image-carousel.module.scss";
import { JSX, useState, useCallback } from "react";
import Image from 'next/image';

interface ImageCarouselProps {
  images: Array<StrapiImage>;
  ariaLabel?: string;
}

export function ImageCarousel({ 
    images, 
    ariaLabel = "Image carousel" }: ImageCarouselProps): JSX.Element | null {

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = useCallback(() => {
        setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
    }, [images.length]);

    const goToNext = useCallback(() => {
        setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
    }, [images.length]);

      // Keyboard Navigation
    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        switch (event.key) {
        case 'ArrowLeft':
                event.preventDefault();
                goToPrevious();
                break;

        case 'ArrowRight':
                event.preventDefault();
                goToNext();
                break;
        }
    }, [goToPrevious, goToNext]);

    if (!images || images.length === 0) {
        return null;
    }

    // Nur ein Bild - zeige ohne Navigation
    if (images.length === 1) {
        return (
            <div className={`${styles.singleImageContainer}`} aria-label="Blogpost Image">
                <Image 
                    src={images[0].url}
                    alt={images[0].alternativeText || `Image-ID: ${images[0].id}`}
                    fill={true}
                    sizes={appConstants.imgDefaultSizes}
                    style={{ objectFit: 'cover' }}
                    loading="eager"
                />
            </div>
        );
    }

    return (
        <div 
        className={`${styles.carousel}`}
        role="region"
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        >
            <div 
                className={styles.imageWrapper}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div key={image.id} className={styles.imageContainer}>
                        <Image
                            key={image.id}
                            src={image.url}
                            alt={image.alternativeText || `Image ${index + 1} of ${images.length}`}
                            fill={true}
                            sizes={appConstants.imgDefaultSizes}
                            style={{ objectFit: 'cover' }}
                            loading={index === 0 ? "eager" : "lazy"}
                            aria-hidden={index !== currentIndex}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={goToPrevious}
                aria-label="Previous image"
                type="button"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
            </button>

            <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={goToNext}
                aria-label="Next image"
                type="button"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
            </button>

            {/* Indicator Dots */}
            <div className={styles.indicators} role="tablist" aria-label="Image indicators">
                {images.map((_, index) => (
                <button
                    key={index}
                    className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                    role="tab"
                    aria-selected={index === currentIndex}
                    type="button"
                />
                ))}
            </div>
        </div>
    );
}
