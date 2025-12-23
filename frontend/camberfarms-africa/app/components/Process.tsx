import React from 'react'
import Image from 'next/image'

const Process = () => {
  return (
    <div className='h-230.25 md:h-322 w-full px-6 py-11.25 md:px-25 md:py-43.25'>
        <div className='h-full w-full'>
            <div>
                <h1 className='font-bold text-[24px] md:text-[46px]'>Our Process</h1>
                <p className="font-medium text-[14px] md:text-[18px] mt-2">We explore a full range of Agricultural technology solutions that ensure maximum value at the least possible cost to smallholder farmers and other relevant stakeholders, ultimately leading to food security for Africans and the World.</p>
            </div>
            <div className='mt-20'>
                <div>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-semibold text-[18px] md:text-[24px]'>Farmer Onboarding</h2>
                        <Image src="/images/arrowdown.png" alt="process step 1" width={44} height={44} className="w-6 h-6 sm:w-11 sm:h-11"/>
                    </div>
                    <hr className='border-[#E6E6E6] mt-4' />
                </div>
                <div className='mt-12.5'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-semibold text-[18px] md:text-[24px]'>Farmer Mapping</h2>
                        <Image src="/images/arrowdown.png" alt="process step 1" width={44} height={44} className="w-6 h-6 sm:w-11 sm:h-11"/>
                    </div>
                    <hr className='border-[#E6E6E6] mt-4' />
                </div>
                <div className='mt-12.5'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-semibold text-[18px] md:text-[24px]'>Input Distribution</h2>
                        <Image src="/images/arrowdown.png" alt="process step 1" width={44} height={44} className="w-6 h-6 sm:w-11 sm:h-11"/>
                    </div>
                    <hr className='border-[#E6E6E6] mt-4' />
                </div>
                <div className='mt-12.5'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-semibold text-[18px] md:text-[24px]'>Field Monitoring</h2>
                        <Image src="/images/arrowdown.png" alt="process step 1" width={44} height={44} className="w-6 h-6 sm:w-11 sm:h-11"/>
                    </div>
                    <hr className='border-[#E6E6E6] mt-4' />
                </div>
                <div className='mt-12.5'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-semibold text-[18px] md:text-[24px]'>Harvesting</h2>
                        <Image src="/images/arrowdown.png" alt="process step 1" width={44} height={44} className="w-6 h-6 sm:w-11 sm:h-11"/>
                    </div>
                    <hr className='border-[#E6E6E6] mt-4' />
                </div>
                <div className='mt-12.5'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-semibold text-[18px] md:text-[24px]'>Inventory Management</h2>
                        <Image src="/images/arrowdown.png" alt="process step 1" width={44} height={44} className="w-6 h-6 sm:w-11 sm:h-11"/>
                    </div>
                    <hr className='border-[#E6E6E6] mt-4' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Process