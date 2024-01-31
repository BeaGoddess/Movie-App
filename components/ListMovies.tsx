
"use client"

import Link from "next/link";
import { AppDispatch, useAppSelector } from "@/store/store";
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from "react";
import { getList } from '@/store/listMovies';
import { IoIosStar, IoIosStarOutline } from "react-icons/io";


export default function ListMovies() {
    const list = useAppSelector((state) => state.listMovies.list)
    const dispatch = useDispatch<AppDispatch>();

    const buttonRef = useRef<{ [key: number]: HTMLDivElement | null }>({});

    const handleMouseEnter = (index: number) => {
        const button = buttonRef.current[index];
        if (button) {
            button.style.opacity = '0.4';
        }
    };

    const handleMouseLeave = (index: number) => {
        const button = buttonRef.current[index];
        if (button) {
            button.style.opacity = '0';
        }
    };


    const fetchData = async () => {
        dispatch(getList());
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="z-50 bg-black/50 max-w-[800px] items-center text-white overflow-x-auto m-2">

            {list.length > 0 && <>
                <div className="text-lg pt-4  px-4"> List of Movies </div>


                <div className="overflow-x-auto m-4">
                    <table className="w-full text-white">
                        <thead className="w-full text-white text-left uppercase text-xs ">
                            <tr>
                                <th className="px-6 py-2"> </th>
                                <th className="px-6 py-2"> Year </th>
                                <th className="px-6 py-2"> Score </th>
                                <th className="px-6 py-2"> Status </th>
                                <th className=""></th>
                            </tr>
                        </thead>

                        <tbody className="text-sm">
                            {list.map((movie, index) => {
                                return (
                                    <tr className="bg-red-900 border-b-2 border-red-950 hover:bg-red-900/60 duration-300"
                                        key={movie?.imdbID}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={() => handleMouseLeave(index)}>
                                        <td className="px-6 py-2 flex">
                                            <div className="mr-1 flex items-center">
                                                {movie?.favorite ? <IoIosStar /> : <IoIosStarOutline />}
                                            </div>
                                            <Link href={`/movie/${movie?.imdbID}`}>
                                                {movie?.Title}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-2"> {movie?.Year} </td>
                                        <td className="px-6 py-2 flex ">
                                            {[...Array(5)].map((star, index) => {
                                                const yellow = movie?.rate !== null && movie?.rate >= index + 1
                                                return <IoIosStar className={yellow ? "text-yellow-400" : "text-gray-400"} key={index} />
                                            })}
                                        </td>
                                        <td className="px-6 py-2">
                                            <div className="text-xs rounded-md bg-gray-500 p-1 uppercase flex truncate font-semibold"> Plan to Watch </div>
                                        </td>

                                        <td className="pr-4">
                                            <div>
                                                <div ref={(button) => (buttonRef.current[index] = button)} className="uppercase p-1 rounded bg-white  text-black flex items-center justify-center font-bold text-xs cursor-pointer duration-700 hover:bg-black hover:text-white " style={{ opacity: '0'}}> Edit </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </>}

            {list.length === 0 && <div> Sem resultados... </div>}

        </div>

    )
}
