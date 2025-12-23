import React from 'react'
import Image from 'next/image'

const Blogs = () => {
  return (
    <div className='h-fit  py-14.5 px-6 w-full md:py-35 md:px-25'>
        <div className=' w-full h-full'>
            <div>
                <h1 className='md:text-[46px] text-[24px] font-bold text-center'>Blogs</h1>
                <p className='md:text-[20px] text-[12px] text-center mt-1'>Stay informed with updates, insights, and stories shaping agriculture across Africa.</p>
            </div>
            <div className='w-full  lg:h-fit h-fit md:mt-25 mt-8 flex lg:flex-row flex-col gap-11'>
                <div className='w-full lg:w-[50%] border-2 border-[#1AD329] border-l-0 rounded-4xl px-4 py-12.5 md:p-12.5 flex flex-col md:items-start items-center'>
                    <h2 className='text-[18px] md:text-[28px] font-medium'>Membership Advantages And Ways To Maximize Profits</h2>
                    <p className='text-[14px] md:text-[18px] mt-2'>Increased investment in agricultural infrastructure is helping African producers tap into new markets across Europe and Asia, with maize and sesame leading the surge.</p>
                    <p className='text-[14px] md:text-[18px]'>Date: September 18, 2025</p>
                    <button className='flex mt-6 text-[#1AD329]'>
                        <p className='text-[14px]'>Read more</p>
                        <Image src="/images/greenarrow.png" alt="arrow right" width={24} height={24} className="ml-2"/>
                    </button>
                </div>
                <div className='w-full lg:h-fit lg:w-[50%] border-2 border-[#1AD329] border-r-0 rounded-4xl px-4 py-12.5 md:p-12.5 flex flex-col md:items-start items-center'>
                    <h2 className='text-[18px] md:text-[28px] font-medium'>Membership Advantages And Ways To Maximize Profits</h2>
                    <p className='text-[14px] md:text-[18px] mt-2'>Increased investment in agricultural infrastructure is helping African producers tap into new markets across Europe and Asia, with maize and sesame leading the surge.</p>
                    <p className='text-[14px] md:text-[18px]'>Date: September 18, 2025</p>
                    <button className='flex mt-6 text-[#1AD329]'>
                        <p className='text-[14px]'>Read more</p>
                        <Image src="/images/greenarrow.png" alt="arrow right" width={24} height={24} className="ml-2"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Blogs