"use client"
import Image from 'next/image';
import { JSX } from "react";
import * as appConstants from "@utils/appConstants"

/**
 * Komponente, die einen Status anzeigt, wenn der Benutzer versucht, zu einem
 * nicht existierenden Inhalt zu navigieren. Die Komponente enthält ein Bild,
 * das den Benutzer darüber informiert, dass der angeforderte Inhalt nicht
 * verfügbar ist.
 *
 * @param {string} [props.type]         - Der Typ des nicht gefundenen Inhalts. [ default: "content" ]
 * @param {number} [props.imgWidth]     - Die Breite des Bildes. [ default: notFoundImgDefaultSize ]
 * @param {number} [props.imgHeight]    - Die Höhe des Bildes. [ default: notFoundImgDefaultSize ]
 *
 * @returns {JSX.Element} Die gerenderte Komponente als Platzhalter.
 */
export function DataNotFound({type = "content", imgWidth = appConstants.notFoundImgDefaultSize, imgHeight =appConstants.notFoundImgDefaultSize}
    :{type?: "content" | "search", imgWidth?: number, imgHeight?: number}): JSX.Element{

    let imageUrl: string = "";

    const styleProps: React.CSSProperties = {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        marginTop: '10px',
        marginBottom: '10px',
    }

    switch (type?.toLowerCase()) {
        case "search":
            imageUrl = appConstants.searchNotFoundImageUrl;
            break;

        default:
            imageUrl = appConstants.contentNotFoundImageUrl;
            break;
    }

    return (
        <div id="data-not-found-container"
             data-testid="data-not-found-container" 
             aria-label="Data not found."
             style={styleProps}>
            <Image  src={imageUrl} 
                    alt="Data not found image."
                    width={imgWidth}
                    height={imgHeight}
                    />
        </div>
    );
}

