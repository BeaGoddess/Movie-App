"use client";

import Search from "@/components/Search"
import Link from 'next/link'

export default function Home() {

  return (
    <>
      <div className='fixed text-white top-0 w-full bg-black flex justify-end pt-1 text-base z-50'>

        <Link href="/">
          <div className='py-1 px-2 m-1  hover:bg-red-600/30 rounded-md duration-300'> Home </div>
        </Link>
        <Link href="/list">
          <div className='py-1 px-2 m-1 hover:bg-red-600/30 rounded-md duration-300'> List of Movies </div>
        </Link>
      </div>

      <Search />
    </>
  )
}
