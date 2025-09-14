'use client';
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useGlobalState } from '@/context/GlobalStateContext';

/**
 * Hook, die true zurückgibt, wenn die aktuelle Route auf /search (oder Subroutes davon) ist.
 */
export function useIsOnSearchPage(): boolean {
    const { isOnSearchPage, setIsOnSearchPage } = useGlobalState();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.match(/^\/[a-z]{2}\/search/)) {
            setIsOnSearchPage(true);
        } else {
            setIsOnSearchPage(false);
        }
    }, [pathname, setIsOnSearchPage]);

    return isOnSearchPage;
}

/**
 * Hook, die true zurückgibt, wenn die aktuelle Route auf /blogs (oder Subroutes davon) ist.
 */
export function useIsOnBlogPage(): boolean {
    const { isOnBlogPage, setIsOnBlogPage } = useGlobalState();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.match(/^\/[a-z]{2}\/blogs/)) {
            setIsOnBlogPage(true);
        } else {
            setIsOnBlogPage(false);
        }
    }, [pathname, setIsOnBlogPage]);

    return isOnBlogPage;
}

/**
 * Hook, die true zurückgibt, wenn die aktuelle Route auf /impressum (oder Subroutes davon) ist.
 */
export function useIsOnImprintPage(): boolean {
    const { isOnImprintPage, setIsOnImprintPage } = useGlobalState();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.match(/^\/[a-z]{2}\/imprint/)) {
            setIsOnImprintPage(true);
        } else {
            setIsOnImprintPage(false);
        }
    }, [pathname, setIsOnImprintPage]);

    return isOnImprintPage;
}