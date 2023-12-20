import MovieDetails from "@/components/MovieDetails";
import Link from 'next/link'

export default function MoviePage({ params }: { params: { id: string } }) {

  return (
    <>
      <div className='fixed text-white top-0 w-full bg-black flex justify-between pt-1 text-base'>
        <div className='py-1 ml-4 mr-1 my-1  font-bold text-2xl'>
          Movie App
        </div>

        <div className="flex justify-end">
          <Link href="/">
            <div className='py-1 px-2 m-1  hover:bg-red-600/30 rounded-md duration-300'> Home </div>
          </Link>
          <Link href="/list">
            <div className='py-1 px-2 m-1 hover:bg-red-600/30 rounded-md duration-300'> List of Movies </div>
          </Link>
        </div>
      </div>
      
      <div className="z-50">
        <MovieDetails id={params.id} />
      </div>
    </>
  )
}