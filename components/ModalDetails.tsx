import { useState, MouseEvent, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

import { AppDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';
import { removeMovie } from '@/store/listMovies';

interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string | undefined;
};

interface ModalDetailsProps {
    movie: Movie;
    visible: boolean;
    setVisible: () => void;
}

export default function ModalDetails({ movie, visible, setVisible }: ModalDetailsProps) {

    const [movieModal, setMovieModal] = useState<Movie>(movie);

    const dispatch = useDispatch<AppDispatch>();
      
    useEffect(() => {
        setMovieModal(movie)
    }, [movie]);

    const deleteMovie = () => {
        dispatch(removeMovie(movie?.imdbID));
        setVisible();
    }

    const handleCancelDiv = (event: MouseEvent<HTMLHeadingElement>) => {
        const target = event.target as HTMLHeadingElement;

        if (target.id === "wrapper") {
            setVisible();
        }
    }

    return (
        <div className={`absolute w-full h-full top-0 bottom-0 right-0 left-0 ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} duration-700`} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onMouseDown={handleCancelDiv}>
            <div id="wrapper" className="flex h-screen justify-center items-center">
                <div className="flex-col justify-center bg-zinc-950 m-4 p-4 rounded-lg shadow-lg" style={{ width: "600px", height: "" }}>

                    <div className="flex justify-between mb-4">
                        <div className="text-white font-extrabold text-xl "> {movieModal?.Title} </div>
                        <div onClick={setVisible} >
                            <IoMdClose className="cursor-pointer hover:text-blue-600" />
                        </div>
                    </div>

                    <div className="flex text-white">
                        <img src={movieModal?.Poster !== "N/A" ? movieModal?.Poster: ""} alt={movieModal?.Title} className="rounded min-[600px]:w-[160px] min-[600px]:h-auto object-cover w-full h-[200px] "></img>

                        <div className="flex flex-col m-2 flex-grow text-sm">
                            <div className="my-2 flex w-full items-center">
                                <div className="mx-2 font-semibold w-1/4 text-sm text-gray-400"> Status </div>
                                <div> Input </div>
                            </div>
                            <div className="my-2 flex w-full items-center">
                                <div className="mx-2 font-semibold w-1/4 text-sm text-gray-400"> Score Rating </div>
                                <div> Input </div>
                            </div>
                            <div className="my-2 flex w-full items-center">
                                <div className="mx-2 font-semibold w-1/4 text-sm text-gray-400"> Favourite </div>
                                <div> Input </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between mt-3 text-sm">
                        <div className="border border-red-600 bg-red-800 p-1 rounded w-24 text-center hover:bg-red-600 duration-300 cursor-pointer font-medium"
                            onClick={deleteMovie}> Delete
                        </div>

                        <div className="flex gap-2">
                            <div className="border border-gray-600 bg-gray-500 p-1 rounded w-24 text-center hover:bg-gray-600 duration-300 cursor-pointer font-medium"
                                onClick={setVisible}>
                                Cancel
                            </div>
                            <div className="border border-blue-600 bg-blue-500 p-1 rounded w-24 text-center hover:bg-blue-600 duration-300 cursor-pointer font-medium">
                                Save
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}