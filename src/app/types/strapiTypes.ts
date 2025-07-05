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
  titleImages: Array<StrapiImage>; // Array of images or null if no image is set
  content?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  country: string;
  featuredImages: Array<StrapiImage>;
  publishedAt: string;
  locale: string;
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
  formats: StrapiImageFormats;
  extension: string;
  hash?: string;
}

export interface StrapiImageFormats {
  original: StrapiImageFormat | null; // Original image format
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
  width: number;
  height: number;
  size: number | null;
  sizeInBytes: number | null;
  url: string;
  alternativeText?: string | '';
}
