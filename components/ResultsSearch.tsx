import { useAppSelector } from "@/store/store";
import Pagination from "@/components/Pagination";
import MovieBox from "./MovieBox";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function ResultsSearch() {

    const list = useAppSelector((state) => state.movies.list)
    const [loader, setLoader] = useState<boolean>(true);

    useEffect(() => {
        if (list.length !== 0) {
            setLoader(false)
        }
    }, [list]);


    return (
        <>{loader ? <Spinner /> : <>
            <div className="overflow-auto mt-4 z-50 mb-2">
                <div className="text-white grid sm:grid-cols-3 lg:grid-cols-5 grid-cols-2 gap-2 p-1"> {/* bg-[#410f0f] */}

                    {list.map((e: any) => {
                        return <MovieBox key={e.imdbID} movie={e} />
                    })}

                </div>
            </div>
            <Pagination />
        </>}
        </>

    )
}
