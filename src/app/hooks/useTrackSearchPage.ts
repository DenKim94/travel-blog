'use client';
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useGlobalState } from '@/context/GlobalStateContext';

/**
 * Hook, der true zurückgibt, wenn die aktuelle Route auf /search (oder Subroutes davon) ist.
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