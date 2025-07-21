'use client'
import { JSX } from "react";
import { useParams } from 'next/navigation';
import * as appConstants from "@utils/appConstants"
import GenericButton from "@components/GenericButton";
import { BlogPostData } from '@/types/strapiTypes';
import { useBackToHomeCallback } from '@hooks/useBackHomeCallback';

export default function SearchResultsBoard({ results }: { results: Array<BlogPostData>| null }): JSX.Element{
    const params = useParams();
    const lang = params.lang as string; 
    const backToHome = useBackToHomeCallback();

    console.log("results: ", results);

    return (
        <div className="search-results-board">
            <p>Platzhalter: Suchergebnisse</p>
            {/* TODO: Suchergebnisse/Treffer als Cards anzeigen */}
            <GenericButton
            title={appConstants.notFoundTranslations[lang].backToHome}
            onClick={backToHome}
            />
        </div>
    );
}
