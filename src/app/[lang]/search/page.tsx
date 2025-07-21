import { Suspense } from 'react';
import { CustomLoader } from "@/components/CustomLoader";
import { cookies } from 'next/headers';
import * as helperFunctions from "@utils/helperFunctions"
import * as appConstants from "@utils/appConstants"
import SearchResultsBoard from "@/components/SearchResultsBoard";

interface SearchPageProps {
    searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const resolvedSearchParams = await searchParams;
    const cookieStore = await cookies();
    const language = await helperFunctions.getLanguageFromCookies(cookieStore);
    const loaderMessage = appConstants.searchLoaderTranslations[language as keyof typeof appConstants.searchLoaderTranslations].title;
    
    const query = resolvedSearchParams.q as string;
    {/* TODO: [21.07.2025]
        1. Suche durchführen: query <--> strapiClient.getBlogPostData() 
        2. Treffer an Subkomponente übergeben */}

    return (
        <div className="search-page">
            <h1> Suche nach: {query}</h1>
            <Suspense fallback={<CustomLoader message={loaderMessage} />}>
                <SearchResultsBoard results={null} />
            </Suspense>
        </div>
    );
}