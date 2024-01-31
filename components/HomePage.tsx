import Image from 'next/image'
import cinema from '@/public/cinema.jpg'

export default function HomePage() {

    return (
        <>

            <Image
                src={cinema}
                className='absolute inset-0 w-full h-full object-cover opacity-20'
                alt="background"
            />
            <div
                className='absolute top-0 w-full h-full flex flex-col justify-center items-center'
                style={{
                    height: "100%",
                    width: "100vw",
                    background: "linear-gradient(180deg, rgba(255,255,255,0) 40%, rgba(255,0,0,0.4) 100%)"
                }}>
            </div>

        </>

    )

}
