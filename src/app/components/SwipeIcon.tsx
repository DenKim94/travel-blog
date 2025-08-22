"use client"
import Image from 'next/image';
import { JSX } from "react";
import style from "@styles/components/swipe-icon.module.scss";
import * as appConstants from "@utils/appConstants"

export function SwipeIcon({isVisible}: {isVisible: boolean}) : JSX.Element {

    return (
        <div className={`${style.swipeIcon} ${isVisible ? style.visible : ''}`}>
            <Image
                src={appConstants.SWIPE_ICON_URL}
                alt={appConstants.SWIPE_ICON_ALT_TEXT}
                width={appConstants.SWIPE_ICON_WIDTH}
                height={appConstants.SWIPE_ICON_HEIGHT}
            />
        </div>
    );
}