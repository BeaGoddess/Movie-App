"use client";

import React, { KeyboardEvent, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeList, changePage, changeResults, changeSearch, removeList } from '@/store/movies';
import { AppDispatch } from '@/store/store';
import ResultsSearch from './ResultsSearch';

export default function Search() {

    const APIKEY = "3e597291";
    const dispatch = useDispatch<AppDispatch>();
    const [openResults, setOpenResults] = useState<boolean>(false);


    const onSubmit = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {

            let value = e.currentTarget.value

            try {

                const res = await axios.get(`http://www.omdbapi.com/?type=movie&s=${value}&apikey=${APIKEY}`);

                if (res.status === 200 && res.data.Response === "True") {

                    dispatch(changeList(res.data.Search));
                    dispatch(changeResults(res.data.totalResults));
                    dispatch(changePage(1));
                    dispatch(changeSearch(value));
                    setOpenResults(true)

                } else if (res.data.Response === "False") {
                    dispatch(removeList());
                    setOpenResults(false)
                }

            } catch (error) {
                return { error };
            }
        }
    }

    return (<>
        <div className="flex flex-col text-white justify-center z-30 w-[30rem] p-1 mt-12" >
            <div className='mb-6 text-center'>
                <div className='text-4xl mb-2'> Movies App </div>
                <div className='text-sm'> Application to search for movies and add them to a list</div>
            </div>

            <input className='appearance-none bg-transparent border border-red-700 py-1 px-4 rounded-lg focus:outline-none text-white text-center text-sm placeholder:text-gray-400 w-full' placeholder='Search movie'
                onKeyUp={(e) => { onSubmit(e) }} />
        </div>

        {openResults && <ResultsSearch />}
    </>
    )
}



