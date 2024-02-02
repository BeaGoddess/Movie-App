import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'


type Movie = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Genre: string;
    Poster: string | undefined;
    favorite: boolean,
    state: string | null,
    rate: number | null
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
            if(localStorage.getItem('list')){
                state.list = JSON.parse(localStorage.getItem('list') ?? "")
            } else {
                state.list = []
            }
        },
        removeMovie: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter((item) => item.imdbID !== action.payload)
            localStorage.setItem("list", JSON.stringify(state.list));
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