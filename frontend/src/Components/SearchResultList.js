import React from 'react'
import { SearchResult } from "./SearchResult"

import "./SearchResultsList.css";

export const SearchResultsList = ({ results }) => {
    return (<div className="results-list">
        {results.map((result, id) => {
                return <SearchResult result={result} key={id}/>;
            })}
    </div>
    );
};
