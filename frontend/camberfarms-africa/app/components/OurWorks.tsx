import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const OurWorks = () => {
    return (
        <div className='w-full'>
            <div className='relative w-full h-177.5'>
                <img src="/images/our-work-hero.png" alt="what we do 1" className='h-full w-full' />
                <div className='absolute left-25 top-66.75 text-white pr-90'>
                    <h1 className="md:text-[56px] text-[24px] font-bold ">Our Work</h1>
                    <p className="md:text-[22px] text-[14px] mt-6">We work hand-in-hand with Farmers across Africa to improve productivity, strengthen rural communities and build sustainable agricultural systems. Our work focuses on empowering farmers with the tools, training and market access they need to thrive.</p>
                </div>
            </div>
            <div className='md:px-25 px-6 mt-12.5'>
                <div className='flex gap-12.5 hover:font-bold md:text-[24px] text-[16px]'>
                    <Link href=''>Membership</Link>
                    <Link href=''>Farm Fund</Link>
                    <Link href=''>Exportation</Link>
                    <Link href=''>Our Technology</Link>
                    <Link href=''>Our Process</Link>
                </div>
            </div>
        </div>
    )
}

export default OurWorks