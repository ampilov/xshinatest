import Link from 'next/link'
import React from 'react'

function Header() {
    return (
        <header className='w-full h-[50px] bg-[#2a2c2d] flex justify-center'>
            <div className='sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px] gap-5 text-white h-full flex items-center underline'>
                <Link href={'/'}>
                    <p>Главная</p>
                </Link>
                <Link href={'/contacts'}>
                <p>Контакты</p>
                </Link>
            </div>
        </header>
    )
}

export default Header