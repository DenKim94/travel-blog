
export type strapiLocaleType = "de" | "en" | "ru-RU";

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface LandingPageData {
  id: number;
  title: string;
  titleImages: StrapiImage | null;
  content?: string;
  createdAt: string;
  updatedAt: string;
}

// Für Blog-Übersichtsseiten (Liste)
export interface BlogPostListData {
  id: number;
  documentId: string;
  title: string;
  country: string;
  publishedAt: string;
  locale: string;
  featuredImage: StrapiImage;              // Nur Thumbnail für Performance
}

export interface BlogPostDetailedData {
  id: number;
  title: string;
  description: string;
  country: string;
  featuredImages: Array<StrapiImage> | []; // Alle Bilder für den Blog-Beitrag
  publishedAt: string;
  locale: string;
}

// Generischer Typ für beide Szenarien
export type BlogPostData = BlogPostListData | BlogPostDetailedData;

export interface TravelMapData {
  name: string;
  imageProps: StrapiImage | null;
  updatedAt: string;
}

export interface PrivacyPolicyData {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface AboutPageData {
  id: number;
  titleImage: StrapiImage | null;
  description: string;
  profileImage: StrapiImage | null;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  width: number | null;
  height: number | null;
  formats: StrapiImageFormats | null;
  extension: string;
  hash?: string;
}

export interface StrapiImageFormats {
  original: StrapiImageFormat | null;
  thumbnail: StrapiImageFormat | null;
  small: StrapiImageFormat | null;
  medium: StrapiImageFormat | null;
  large: StrapiImageFormat | null;
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string;
  width: number | null;
  height: number | null;
  size: number | null;
  sizeInBytes: number | null;
  url: string;
  alternativeText?: string | '';
}
