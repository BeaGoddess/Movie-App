import ListMovies from "@/components/ListMovies";
import Link from 'next/link'

export default function List() {

    return (<>
        <div className='fixed text-white top-0 w-full bg-black flex justify-between pt-1 text-base left-0 right-0'>
            <div className='py-1 ml-4 mr-1 my-1  font-bold text-2xl'>
                Movie App
            </div>

            <div className="flex justify-end">
                <Link href="/">
                    <div className='py-1 px-2 m-1 hover:bg-red-600/30 rounded-md duration-300'> Home </div>
                </Link>
                <Link href="/list">
                    <div className='py-1 px-2 m-1 bg-red-600/60 hover:bg-red-600/30 rounded-md duration-300'> List of Movies </div>
                </Link>
            </div>
        </div>

        <ListMovies />

    </>
    )
}