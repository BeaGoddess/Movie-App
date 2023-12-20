import { useState } from "react";
import Link from 'next/link'


export default function MovieBox({ movie }: any) {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <Link href={`/movie/${movie.imdbID}`}>
            <div className="flex flex-col w-[200px] " key={movie.imdbID}>

                <div className={"border-2 rounded-xl relative overflow-hidden border-red-800 hover:border-red-500 w-full duration-300 h-[280px]"} >
                    <img src={movie.Poster} alt={movie.Title} className="w-[200px] object-cover h-full"></img>
                    <div className="absolute top-0 p-1 m-1 bg-red-500 rounded-lg text-xs font-semibold"> {movie.Year} </div>
                    <div className={`absolute top-0 text-white flex flex-col w-full h-full justify-center items-center bg-gradient-movie transition-opacity duration-300 ease-linear'}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ opacity: isHovered ? 1 : 0 }}></div>
                </div>
                <div className="text-sm mt-1 text-center"> {movie.Title} </div>
            </div>
        </Link>
    )
}