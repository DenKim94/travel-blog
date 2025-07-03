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
  attributes: {
    title: string;
    subtitle?: string;
    heroImage?: StrapiImage;
    content?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface BlogPost {
  id: number;
  attributes: {
    title: string;
    excerpt: string;
    slug: string;
    featuredImage?: StrapiImage;
    publishedAt: string;
  };
}

export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText?: string;
      width: number;
      height: number;
    };
  };
}
