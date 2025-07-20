"use client"
import Image from 'next/image';
import { JSX } from "react";
import * as appConstants from "@utils/appConstants"


/**
 * Komponente, die einen Status anzeigt, wenn der Benutzer versucht, zu einem
 * nicht existierenden Inhalt zu navigieren. Die Komponente enthält ein Bild,
 * das den Benutzer darüber informiert, dass der angeforderte Inhalt nicht
 * vorhanden ist.
 *
 * @returns {JSX.Element} Die gerenderte Komponente als Platzhalter.
 */
export function ContentNotFound({imgWidth = appConstants.notFoundImgDefaultSize, 
    imgHeight =appConstants.notFoundImgDefaultSize}: {imgWidth?: number, imgHeight?: number})
    : JSX.Element{
    
        const styleProps: React.CSSProperties = {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
    }

    return (
        <div id="content-not-found-container" 
             aria-label="Content not found."
             style={styleProps}>
          <Image src={appConstants.contentNotFoundImageUrl} 
                  alt="Content not found image."
                  width={imgWidth}
                  height={imgHeight}
                  />
        </div>
    );
}