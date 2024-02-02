"use client";

import React, { KeyboardEvent, useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeList, changePage, changeResults, changeSearch, removeList } from '@/store/movies';
import { AppDispatch } from '@/store/store';

import { useRouter } from 'next/navigation';

import ResultsSearch from './ResultsSearch';

interface SearchProps {
    name?: string;
    number?: number;
}

export default function Search({ name, number }: SearchProps = {}) {
    const router = useRouter()

    const dispatch = useDispatch<AppDispatch>();

    const APIKEY = "3e597291";

    const [inputValue, setInputValue] = useState(name ?? '')

    const fetchData = async (value: string, page: number) => {
        try {
            const res = await axios.get(`http://www.omdbapi.com/?type=movie&s=${value}&apikey=${APIKEY}&page=${page ?? 1}`);

            if (res.status === 200 && res.data.Response === "True") {
                
                dispatch(changeList(res.data.Search));
                dispatch(changeResults(res.data.totalResults));
                dispatch(changePage(page ?? 1));
                dispatch(changeSearch(value));
                return true;

            } else if (res.data.Response === "False") {
                dispatch(removeList());
                return false;
            }
            return false;
        } catch (error) {
            console.log({ error });
            return false;
        }
    }

    const onSubmit = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            let value = e.currentTarget.value
            router.push(`/search/${value}/page/1`);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        if (name !== undefined && number !== undefined) fetchData(name, number);
    }, []);

    return (
        <div className='flex flex-col w-full h-full justify-center items-center'>
            <div className="flex flex-col text-white justify-center z-30 w-[30rem] p-1 mt-12" >
                <div className='mb-6 text-center'>
                    <div className='text-4xl mb-2'> Movies App </div>
                    <div className='text-sm'> Application to search for movies and add them to a list</div>
                </div>

                <input className='appearance-none bg-transparent border border-red-700 py-1 px-4 rounded-lg focus:outline-none text-white text-center text-sm placeholder:text-gray-400 w-full'
                    placeholder='Search movie'
                    value={inputValue}
                    onChange={handleChange}
                    onKeyUp={(e) => { onSubmit(e) }}
                />
            </div>
            {name !== undefined && number !== undefined && <ResultsSearch />}
        </div>

    )
}



