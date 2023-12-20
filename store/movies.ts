import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

type Movie = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
};

export interface MoviesList {
    list: Movie[],
    results: number,
    page: number,
    search: string
}

const initialState: MoviesList = {
    list: [],
    results: 0,
    page: 0,
    search: ""
}

export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        changeList: (state, action: PayloadAction<Movie[]>) => {
            state.list = action.payload
        },
        changeResults: (state, action: PayloadAction<number>) => {
            state.results = action.payload
        },
        changePage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        changeSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        removeList: () => {
            return initialState
        }
    }
})

export const getMovies = (state: RootState) => state.movies.list;

// Criar as funções que alteram os valores disto
export const { changeList, changePage, changeResults, changeSearch, removeList } = moviesSlice.actions
export default moviesSlice.reducer