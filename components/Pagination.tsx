"use client";

import { useAppSelector } from "@/store/store";
import { useRouter } from 'next/navigation';

export default function Pagination() {
    const router = useRouter()

    const _ = require('lodash');
    const results = useAppSelector((state) => state.movies.results)
    let totalPage = Math.ceil(results / 10)

    let page = useAppSelector((state) => state.movies.page)
    let search = useAppSelector((state) => state.movies.search)

    const returnPaginationRange = (totalPage: number, page: number, limit: number, siblings: number) => {

        let totalPageNoInArray = 7 + siblings;
        if (totalPageNoInArray >= totalPage) {
            return _.range(1, totalPage + 1)
        }

        let leftSiblingsIndex = Math.max(page - siblings, 1);
        let rightSiblingsIndex = Math.min(page + siblings, totalPage)

        let showLeftDots = leftSiblingsIndex > 2
        let showRightDots = rightSiblingsIndex < totalPage - 2;

        if (!showLeftDots && showRightDots) {
            let leftItemsCount = 3 + 2 * siblings;
            let leftRange = _.range(1, leftItemsCount + 1);
            return [...leftRange, " ...", totalPage]

        } else if (showLeftDots && !showRightDots) {
            let rightItemsCount = 3 + 2 * siblings;
            let rightRange = _.range(totalPage - rightItemsCount + 1, totalPage + 1);
            return [1, "... ", ...rightRange];

        } else {
            let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1)
            return [1, "... ", ...middleRange, " ...", totalPage]
        }
    }

    async function handlePageChange(value: string) {

        let currentPage = 0;

        if (value === "&laquo;" || value === "... ") {
            currentPage = 1;
        } else if (value === "&lsaquo;") {
            if (page !== 1) {
                currentPage = page - 1
            }

        } else if (value === "&rsaquo;") {
            if (page !== totalPage) {
                currentPage = page + 1
            }
        } else if (value === "&raquo;" || value === " ...") {
            currentPage = totalPage
        } else {
            currentPage = parseInt(value)
        }

        if(currentPage === 0) currentPage = 1;

        if (currentPage !== page) {
            try {
                router.push(`/search/${search}/page/${currentPage}`);
            } catch (error) {
                return { error };
            }
        }
    }

    let array = returnPaginationRange(totalPage, page, 10, 1)

    return (
        <ul className="text-white z-50 flex gap-1 mb-2">
            <li className="bg-red-900 w-8 h-8 rounded-xl flex justify-center items-center cursor-pointer" onClick={() => { handlePageChange("&laquo;") }}> <span>&laquo; </span></li>
            <li className="bg-red-900 w-8 h-8 rounded-xl flex justify-center items-center cursor-pointer" onClick={() => { handlePageChange("&lsaquo;") }}> <span>&lsaquo;  </span></li>

            {array.map((value: any) => {
                if (value === page) {
                    return (
                        <li key={value} className="bg-red-600 w-8 h-8 rounded-xl flex justify-center items-center cursor-pointer" onClick={() => { handlePageChange(value) }}> <span >{value} </span></li>
                    )
                } else {
                    return (
                        <li key={value} className="bg-red-900 w-8 h-8 rounded-xl flex justify-center items-center cursor-pointer" onClick={() => { handlePageChange(value) }}> <span >{value} </span></li>
                    )
                }
            })}

            <li className="bg-red-900 w-8 h-8 rounded-xl flex justify-center items-center cursor-pointer" onClick={() => { handlePageChange("&rsaquo;") }}><span >&rsaquo; </span></li>
            <li className="bg-red-900 w-8 h-8 rounded-xl flex justify-center items-center cursor-pointer" onClick={() => { handlePageChange("&raquo;") }}> <span > &raquo;</span></li>
        </ul>
    )
}



