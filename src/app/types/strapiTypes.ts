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

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  country: string;
  featuredImages: Array<StrapiImage>;
  publishedAt: string;
  locale: string;
}

export interface TravelMapData {
  name: string;
  imageProps: StrapiImage | null;
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
