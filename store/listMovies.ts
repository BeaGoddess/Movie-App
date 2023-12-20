import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'


type Movie = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Genre: string;
    Poster: string,
    favorite: boolean,
    state: string,
}

export interface MoviesList {
    list: Movie[],
}

const initialState: MoviesList = {
    list: [],
}

export const listMoviesSlice = createSlice({
    name: "listMovies",
    initialState,
    reducers: {
        addMovie: (state, action: PayloadAction<Movie>) => {
            state.list.push(action.payload)
            localStorage.setItem("list", JSON.stringify(state.list));
        },
        getList: (state) => {
            state.list = JSON.parse(localStorage.getItem('list') || "")
        },
        removeMovie: (state, action: PayloadAction<number>) => {
        },
        setFavorite: (state, action: PayloadAction<number>) => {
        },
        setState: (state, action: PayloadAction<string>) => {
        },
    }
})

export const getMovies = (state: RootState) => state.movies.list;

// Criar as funções que alteram os valores disto
export const { addMovie, removeMovie, setFavorite, setState, getList } = listMoviesSlice.actions
export default listMoviesSlice.reducer