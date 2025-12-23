import React from 'react'
import Image from 'next/image'

const WhatWeDo = () => {
  return (
    <div className='h-fit sm:h-326.75 w-full px-3 lg:px-25 lg:py-42.75 py-21'>
        <div className='w-full h-full flex flex-col items-center'>
            <h1 className='font-bold text-[24px] md:text-[46px]'>What We Do</h1>
            <div className='md:mt-25 mt-12.5'>
                <div className='flex md:flex-row flex-col md:gap-50 gap-12.5'>
                    <div>
                        <div>
                            <Image src="/images/whatwedo1.png" alt="what we do 1" width={60} height={60} className="w-11 h-11 md:w-15 md:h-15"/>
                        </div>
                        <h2 className='mt-6 md:mt-9 md:text-[32px] text-[18px] font-medium'>Sourcing from Trusted African Farmers</h2>
                        <p className='mt-3 md:mt-4 md:text-[18px] tet-[14px]'>We partner directly with smallholder farmers and cooperatives across Africa, ensuring ethical sourcing and fair trade. Through training, access to resources, and transparent supply chains, we empower farmers to produce world-class crops.</p>
                    </div>
                    <div>
                        <div>
                            <Image src="/images/whatwedo2.png" alt="what we do 1" width={60} height={60} className="w-11 h-11 md:w-15 md:h-15"/>
                        </div>
                        <h2 className='mt-6 md:mt-9 md:text-[32px] text-[18px] font-medium'>Ensuring Premium Quality Standards</h2>
                        <p className='mt-3 md:mt-4 md:text-[18px] tet-[14px]'>Every product undergoes strict inspection, sorting, and quality control to meet export specifications.  Our teams maintain international standards of cleanliness, moisture content, and grading ensuring reliability in every shipment.</p>
                    </div>
                </div>
                <div className='flex md:flex-row flex-col md:gap-50 gap-12.5 mt-25'>
                    <div>
                        <div>
                            <Image src="/images/whatwedo3.png" alt="what we do 1" width={60} height={60} className="w-11 h-11 md:w-15 md:h-15"/>
                        </div>
                        <h2 className='mt-6 md:mt-9 md:text-[32px] text-[18px] font-medium'>Export-Ready Packaging with Global Compliance</h2>
                        <p className='mt-3 md:mt-4 md:text-[18px] tet-[14px]'>We use eco-friendly, export-grade packaging designed to preserve freshness and meet NAFDAC and Organic certification standards.  Each shipment is fully documented and traceable from farm to port.</p>
                    </div>
                    <div>
                        <div>
                            <Image src="/images/whatwedo4.png" alt="what we do 1" width={60} height={60} className="w-11 h-11 md:w-15 md:h-15"/>
                        </div>
                        <h2 className='mt-6 md:mt-9 md:text-[32px] text-[18px] font-medium'>Connecting Africa to the World</h2>
                        <p className='mt-3 md:mt-4 md:text-[18px] tet-[14px]'>From our hubs in Nigeria, Ghana, and East Africa, we deliver agricultural excellence to clients across Europe, Asia, and the Americas  on time and in top condition.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WhatWeDo