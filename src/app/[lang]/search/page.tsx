import { Suspense } from 'react';
import { CustomLoader } from "@/components/CustomLoader";
import { cookies } from 'next/headers';
import * as helperFunctions from "@utils/helperFunctions"
import * as appConstants from "@utils/appConstants"
import SearchResultsBoard from "@/components/SearchResultsBoard";
import { getBlogPosts } from "@/lib/contentService";
import { BlogPostListData } from '@/types/strapiTypes';

interface SearchPageProps {
    searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const resolvedSearchParams = await searchParams;
    const cookieStore = await cookies();
    const language = await helperFunctions.getLanguageFromCookies(cookieStore) as appConstants.SupportedLanguageType;
    const loaderMessage = appConstants.searchLoaderTranslations[language as keyof typeof appConstants.searchLoaderTranslations].title;
    
    const query = resolvedSearchParams.q as string;
    const searchResults = await findQueryElements(language, query);

    return (
        <div>
            <Suspense fallback={<CustomLoader message={loaderMessage} />}>
                <SearchResultsBoard results={searchResults} />
            </Suspense>
        </div>
    );
}

async function findQueryElements(language: appConstants.SupportedLanguageType, query: string): Promise<Array<BlogPostListData> | null> {

    if (!query || !language) {
        return null;
    }
    const blogPosts = await getBlogPosts(language);

    const searchResults = blogPosts?.filter((post: BlogPostListData) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.country.toLowerCase().includes(query.toLowerCase())
    );

    return searchResults && searchResults.length > 0 ? searchResults : null;
}