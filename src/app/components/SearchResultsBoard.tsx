'use client'
import { JSX } from "react";
import { useParams } from 'next/navigation';
import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/search-results-board.module.scss"
import GenericButton from "@components/GenericButton";
import { BlogPostData } from '@/types/strapiTypes';
import { useBackToHomeCallback } from '@hooks/useBackHomeCallback';
import { DataNotFound } from "./DataNotFound";
import { FoundBlogPostsContainer } from "@/components/FoundBlogPostsContainer";

export default function SearchResultsBoard({ results }: { results: Array<BlogPostData>| null }): JSX.Element{
    const params = useParams();
    const lang = params.lang as string; 
    const backToHome = useBackToHomeCallback();
    
    const buttonStyle = {
        marginTop: '0px',
        width: '250px'
    }

    if (!results) {
        return (
            <div className={styles.searchResultsNotFound}>
                <DataNotFound />
                <GenericButton
                    title={appConstants.notFoundTranslations[lang].backToHome}
                    onClick={backToHome}
                />
            </div>
        );
    }

    return (
        <div className={styles.searchResultsBoard}>
            <FoundBlogPostsContainer data={results} />
            <GenericButton
                title={appConstants.notFoundTranslations[lang].backToHome}
                onClick={backToHome}
                style={buttonStyle}
                runAnimation={true}
            />
        </div>
    );
}
