'use client'
import React from 'react'
import Image from 'next/image'
import bannerimg from '../app/assets/images/banner01.webp'
const Banner: React.FC = () => {
  return (
    <>
        <div className='main_banner'>
            <div className='banner_content'>
                <Image src={bannerimg} className='w-full h-full' alt='Banner Image' />
            </div>
        </div>
    </>
  )
}

export default Banner