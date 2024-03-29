"use client";

import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { AppDispatch, useAppSelector } from '@/store/store';
import { useDispatch } from 'react-redux';
import { addMovie, removeMovie, getList } from '@/store/listMovies';

interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string | undefined;
    Genre: string;
    Runtime: string;
    Actors: string;
    Plot: string;
    Director: string;
    Released: string;
};


const initialState: Movie = {
    Title: "",
    Year: "",
    imdbID: "",
    Type: "",
    Poster: "",
    Genre: "",
    Runtime: "",
    Actors: "",
    Plot: "",
    Director: "",
    Released: ""
}

export default function MovieDetails({ id }: { id: string }) {

    const APIKEY = "3e597291";
    const [movie, setMovie] = useState<Movie>(initialState);
    const [loader, setLoader] = useState<boolean>(true);

    const dispatch = useDispatch<AppDispatch>();
    const list = useAppSelector((state) => state.listMovies.list)

    const fetchData = async () => {
        const res = await axios.get(`http://www.omdbapi.com/?type=movie&i=${id}&apikey=${APIKEY}`);

        if (res.status === 200 && res.data.Response === "True") {
            dispatch(getList());
            setMovie(res.data)
            setLoader(false)

        } else if (res.data.Response === "False") {
            setLoader(true)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleClick = (action: string) => {
        if (action === "add") {
            let movieJSON = {
                Title: movie?.Title,
                Year: movie?.Year,
                imdbID: movie?.imdbID,
                Type: movie?.Type,
                Poster: movie?.Poster,
                Genre: movie?.Genre,
                favorite: false,
                state: null,
                rate: null
            }

            dispatch(addMovie(movieJSON));
        } else if (action === "delete") {
            dispatch(removeMovie(movie?.imdbID));
        }
    };

    const checkMovieOnList = () => {
        for (let element of list) {
            if (element.imdbID === movie.imdbID) return true;
        }

        return false
    }

    return (<>
        {loader ? <Spinner /> : <div className="z-50 bg-black/50 flex h-auto m-2 min-[600px]:flex-row flex-col  items-center relative">
            <img src={movie?.Poster !== "N/A" ? movie?.Poster : ""} alt={movie?.Title} className=" rounded min-[600px]:w-[300px] min-[600px]:h-auto min-[600px]:ml-2  min-[600px]:my-2 max-[600px]:p-2 object-cover w-full h-[200px] "></img>

            <div className="p-4 max-w-[550px] text-white text-justify flex flex-col">
                <div className=" font-bold text-2xl">  {movie?.Title} </div>
                <div className="py-1 font-semibold text-red-600">  {movie?.Year} | {movie?.Runtime} | {movie?.Genre} </div>
                <div className="pt-4 font-thin"> <b className="font-bold">Release Date:</b> {movie?.Released} </div>
                <div className="font-thin "> <b className="font-bold">Actors:</b> {movie?.Actors} </div>
                <div className="font-thin "> <b className="font-bold">Director:</b> {movie?.Director} </div>
                <div className="font-thin "> <b className="font-bold">Sinopse:</b> {movie?.Plot} </div>

                {!checkMovieOnList() ?
                    <div className="bg-red-600 rounded flex mt-4 m-auto ml-0 px-2 font-normal text-base cursor-pointer hover:bg-[#410303] transition-all duration-300"
                        onClick={() => handleClick("add")}>
                        + Add to list
                    </div>
                    :
                    <div className="bg-red-600 rounded flex mt-4 m-auto ml-0 px-2 font-normal text-base cursor-pointer hover:bg-[#410303] transition-all duration-300"
                        onClick={() => handleClick("delete")}>
                        - Delete from list
                    </div>}
            </div>

        </div>
        }
    </>
    )
}