"use client"
import { JSX, useState } from "react";
import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/travel-map.module.scss";
import { ContentNotFound } from "@/components/ContentNotFound"; 
import { TravelMapData } from '@/types/strapiTypes';

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

    if (!data || imageError) {
        return <ContentNotFound />;
    }

    return (
        <div className={styles.travelMapContainer} id="travel-map-container">
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
        </div>
    );
}