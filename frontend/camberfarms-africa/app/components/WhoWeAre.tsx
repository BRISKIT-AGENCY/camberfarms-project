import React from 'react'
import Image from 'next/image'

const WhoWeAre = () => {
  return (
    <div className='h-118.75 md:h-221.5 w-full md:-25 md:py-41.25 px-6 py-15.5'>
      <div className='w-full h-full '>
        <h1 className='md:text-[48px] text-[32px] font-bold'>Who We Are</h1>
        <p className='md:text-[36px] text-[16px] md:mt-12.5 mt-7'><span className='md:text-[100px] text-[50px] text-[#FF741F] leading-0'>“</span>CamberFarm Africa is a farmer-first agricultural company committed to empowering rural communities and strengthening Africa’s food systems. We work directly with smallholder and medium-scale farmers, providing them with access to quality inputs, training, market linkages, and the support they need to grow sustainably.</p>
        <button className='flex mt-6 text-[#1AD329]'>
          <p className='md:text-[24px] text-[16px]'>Learn more about us</p>
          <Image src="/images/greenarrow.png" alt="arrow right" width={24} height={24} className="ml-2" />
        </button>
      </div>
    </div>
  )
}

export default WhoWeAre