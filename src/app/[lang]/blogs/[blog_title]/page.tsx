import * as appConstants from "@utils/appConstants";
import type { Metadata, ResolvingMetadata } from "next";
import styles from "@styles/components/blog-page.module.scss";
import { getDetailedBlogPost } from "@/lib/contentService";
import { DataNotFound } from "@/components/DataNotFound";
import { BlogPostContent } from "@/components/BlogPostContent";

function getMetaDescription(text: string | undefined): string | undefined {
  if (!text) return undefined;
  return text.length > 120 ? text.slice(0, 117).trim() + "..." : text;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{lang: appConstants.SupportedLanguageType, blog_title: string}>
}, parent: ResolvingMetadata): Promise<Metadata> {
  
  const parentMeta = await parent;
  const {lang, blog_title} = await params;
  const decodedTitle = decodeURIComponent(blog_title);
  const foundBlogPost = await getDetailedBlogPost(lang, decodedTitle);

  const meta = foundBlogPost ? {
  ...parentMeta,
  // override specific properties with foundBlogPost data
  title: foundBlogPost?.title ?? parentMeta.title,
  description: getMetaDescription(foundBlogPost?.description) ?? parentMeta.description,
  keywords: [...appConstants.defaultMetadataBlogPost[lang].keywords, foundBlogPost.country],
} : appConstants.defaultMetadataBlogPost[lang];

  return meta as Metadata;
}

export default async function TravelBlogsPage({ params }: 
  Readonly<{params: Promise<{lang: appConstants.SupportedLanguageType, blog_title: string}>
}>) {
  const { lang, blog_title} = await params;
  const decodedTitle = decodeURIComponent(blog_title);
  const foundBlogPost = await getDetailedBlogPost(lang, decodedTitle);

  if (!foundBlogPost) { 
    return <DataNotFound />;
  }

  return (
    <section className={styles.blogPage} data-testid="detailed-blog-post-content">
        <h1 className={styles.blogTitle}>{foundBlogPost.title}</h1>
        <BlogPostContent data={foundBlogPost} />
    </section>
  );
}