export type NavigationBarItemType = {
    title: string;
    id: string;
    route?: string;
}

// Typ für die Navigationselemente
export type NavigationKey = "blogs" | "about" | "contact";

// Typ für die Übersetzungen einer Sprache
export type NavigationTitles = Record<NavigationKey, string>;

// Eigenschaften zu den Icons in der Navigationsleiste
export type NavBarIconKeys = "search" | "menu" | "close" | "close_search_field";

export type NavBarIconProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};