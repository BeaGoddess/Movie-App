import Link from 'next/link'

export default function NavBar({ list }: any) {

    return (
        <div className=''>
            <div className="text-4xl text-white">Movie App</div>
            <div className="flex text-white text-sm z-50">
                <Link href="/" className='cursor-pointer m-1'>
                    <div className="bg-red-600/60 rounded-md py-1 px-2 hover:bg-red-600/40 duration-300">Home Page</div>
                </Link>
                {list &&
                    <Link href="/list" className='cursor-pointer m-1'>
                        <div className="bg-red-600/60 rounded-md py-1 px-2 hover:bg-red-600/40 duration-300">List of Movies</div>
                    </Link>}
            </div>
        </div>
    )
}