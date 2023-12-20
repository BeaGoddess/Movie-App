
"use client"

import Link from "next/link";
import { AppDispatch, useAppSelector } from "@/store/store";
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getList } from '@/store/listMovies';


export default function ListMovies() {
    const list = useAppSelector((state) => state.listMovies.list)
    const dispatch = useDispatch<AppDispatch>();

    const fetchData = async () => {
        dispatch(getList());
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="z-50 bg-black/50 max-w-[800px] items-center text-white overflow-x-auto m-2">

            <div className="text-lg pt-4  px-4"> List of Movies </div>

            {list.length > 0 &&
                <table className=" text-white table-auto m-4 w-auto">
                    <thead className="w-full text-white text-left uppercase text-xs ">
                        <tr>
                            <th className="px-6 py-2"> Name </th>
                            <th className="px-6 py-2"> Year </th>
                            <th className="px-6 py-2"> Generes </th>
                            <th className="px-6 py-2"> Status </th>
                            <th className=""></th>
                        </tr>
                    </thead>

                    <tbody className="text-sm">

                        {list.map((movie) => {
                            return (
                                <tr className="bg-red-900 border-b-2 border-red-950 hover:bg-red-900/60 duration-300" key={movie?.imdbID}>
                                    <td className="px-6 py-2"> {movie?.Title} </td>
                                    <td className="px-6 py-2"> {movie?.Year} </td>
                                    <td className="px-6 py-2"> {movie?.Genre} </td>
                                    <td className="px-6 py-2">
                                        <div className="text-xs rounded-md bg-yellow-700 p-1 uppercase flex truncate"> Plan to Watch </div>
                                    </td>

                                    <td className="pr-4">
                                        <div className="flex">
                                            <Link href={`/movie/${movie?.imdbID}`} className="mr-1">
                                                <div className="rounded-full bg-white text-black w-5 h-5 flex items-center justify-center font-bold text-base cursor-pointer hover:bg-black hover:text-white duration-300"> + </div>
                                            </Link>

                                            <div className="rounded-full bg-white text-black w-5 h-5 flex items-center justify-center font-bold text-base cursor-pointer hover:bg-black hover:text-white duration-300"> R </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>}
        </div>

    )
}
