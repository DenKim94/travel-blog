"use client"
import Image from 'next/image';
import { JSX } from "react";
import * as appConstants from "@utils/appConstants"


export function ContentNotFound(): JSX.Element {
    const styleProps: React.CSSProperties = {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
    }

    return (
        <div id="content-not-found-container" style={styleProps}>
          <Image src={appConstants.contentNotFoundImageUrl} 
                  alt="Content not found"
                  width={500}
                  height={500}
                  />
        </div>
    );
}