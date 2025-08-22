"use client"
import { JSX, useState } from "react";
import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/travel-map.module.scss";
import variables from "@styles/variables.module.scss";
import { DataNotFound } from "@/components/DataNotFound"; 
import { TravelMapData } from '@/types/strapiTypes';
import { SwipeIcon } from './SwipeIcon';
import useWindowSize from "@/hooks/useWindowSize";
import { useInView } from "@/hooks/useInView";

/**
 * Die TravelMap-Komponente rendert die Travel-Map-Seite der Anwendung.
 *
 * Die Komponente akzeptiert ein Objekt mit den TravelMap-Daten als Prop
 * und rendert das Titel-Bild und den Titel-Text, wenn die Daten verfügbar
 * sind. 
 * Wenn keine Daten verfügbar sind, wird ein Platzhalter aus ContentNotFound gezeigt.
 */
export function TravelMap({ data }: { data: TravelMapData | null }): JSX.Element {
    const [imageError, setImageError] = useState(false);
    const [ref, isVisible] = useInView<HTMLDivElement>(0.8);
    const { width: windowWidth } = useWindowSize();
    const isMobile = windowWidth <= parseInt(variables.travelMapImgMinWidth, 10);
    const showSwipeIcon = isMobile && isVisible;

    if (!data || imageError) {
        return <DataNotFound />;
    }

    return (
        <div 
            ref={ref} 
            className={styles.travelMapContainer} id="travel-map-container">
            {data?.imageProps && 
            <div className={styles.imageContainer}>
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                <img
                    id="travel-map-image"
                    src={data.imageProps.url}
                    alt={data.imageProps.alternativeText || appConstants.TRAVEL_MAP_ALT_TEXT}
                    className={styles.travelMapImage}
                    onError={() => setImageError(true)}
                />
            </div>}
            {showSwipeIcon && <SwipeIcon isVisible={showSwipeIcon} />}
        </div>
    );
}