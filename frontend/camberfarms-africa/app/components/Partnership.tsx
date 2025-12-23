import React from 'react'
import Image from 'next/image'
const Partnership = () => {
  return (
    <div className='h-fit sm:h-211.25 w-full lg:px-24 lg:py-52 py-25.5 px-6'>
        <div className='h-full w-full flex flex-col items-center'>
            <div className='text-center'>
                <h1 className='font-bold text-[24px] sm:text-[46px] text-[#1AD329]'>Building Strong Partnerships Across Africa</h1>
                <p className='font-medium text-[12px] sm:text-[18px]'>Our work thrives on collaboration.  From smallholder farmer cooperatives to development organizations and global buyers, Camberfarm Africa builds trusted partnerships that drive agricultural innovation, sustainability, and economic growth.</p>
            </div>
            <div className='flex justify-evenly  w-full mt-12.5 md:mt-25'>
                <Image src="/images/nafdac.png" alt="partnership image" width={198} height={198} className="w-17.5 h-17.5 sm:w-32 sm:h-32 lg:w-49.5 lg:h-49.5"/>
                <Image src="/images/nafdac.png" alt="partnership image" width={198} height={198} className="w-17.5 h-17.5 sm:w-32 sm:h-32 lg:w-49.5 lg:h-49.5"/>
                <Image src="/images/nafdac.png" alt="partnership image" width={198} height={198} className="w-17.5 h-17.5 sm:w-32 sm:h-32 lg:w-49.5 lg:h-49.5"/>
                <Image src="/images/nafdac.png" alt="partnership image" width={198} height={198} className="w-17.5 h-17.5 sm:w-32 sm:h-32 lg:w-49.5 lg:h-49.5"/>
            </div>
        </div>
    </div>
  )
}

export default Partnership