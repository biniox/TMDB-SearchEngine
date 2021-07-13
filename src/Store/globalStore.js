import React, { createContext, useReducer, useEffect } from 'react'
import genreReducer from './reducers/genreReducer';

import * as GenreService from './../apiServices/genreService.js';

export const globalContext = createContext();

const GlobalProvider = ({children}) => {
    
    const [genres, dispatchGenres] = useReducer(genreReducer, []);

    useEffect(() => {
        GenreService.getGenre(payload => {
            dispatchGenres({ type: "FETCH", payload })
        })
    }, [])

    return (
        <globalContext.Provider value={
            {
                genres,
                dispatchGenres
            }
        }>
            {children}
        </globalContext.Provider>
    )
}

export default GlobalProvider
