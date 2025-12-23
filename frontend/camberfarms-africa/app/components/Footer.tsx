import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='h-164.25 md:h-94.5 bg-[#808080] w-full flex items-center py-13 px-6 lg:px-25 lg:py-16.5'>
      <div className=' w-full h-full flex flex-col items-center justify-center text-white'>
        <div className='flex flex-col md:flex-row justify-between mb-8 w-full'>
          <div>
            <Image src="/images/logo.png" alt="CamberFarm logo" width={130} height={75} />
          </div>
          <hr className='w-full bg-white md:hidden border'/>
          <div className='mt-3 md:mt-0 flex flex-col text-[14px] md:text-[16px]'>
            <p className='font-bold text-[16px] md:text-[18px]'>Information</p>
            <Link href="/about" className='mt-4 md:mt-6'>About us</Link>
            <Link href="/about" className='mt-3'>Our Impact</Link>
            <Link href="/news" className='mt-3'>News</Link>
          </div>
          <div className='flex flex-col text-[14px] md:text-[16px] mt-6 md:mt-0'>
            <p className='font-bold text-[16px] md:text-[18px]'>Helpful links</p>
            <Link href="/privacy" className='mt-4 md:mt-6'>Privacy / Support</Link>
          </div>
          <div className='flex flex-col md:gap-6 text-[14px] md:text-[16px] mt-6 md:mt-0'>
            <p className='font-bold text-[16px] md:text-[18px]'>Contact us</p>
            <div className='flex mt-4 md:mt-0'>
              <Image src="/images/email.png" alt="Email icon" width={24} height={24} />
              <p>camberfarmafrica@gmail.com</p>
            </div>
            <div className='flex mt-3 md:mt-0'>
              <Image src="/images/phone.png" alt="Phone icon" width={24} height={24} />
              <p>+234 90 974 6104, +234 810 974 8304</p>
            </div>
            <div className='flex gap-3 mt-4 md:mt-0'>
              <a href="">
                <Image src="/images/instagram.png" alt="instagram icon" width={26.5} height={26.5} />
              </a>
              <a href="">
                <Image src="/images/twitter.png" alt="twitter icon" width={26.5} height={26.5} />
              </a>
              <a href="">
                <Image src="/images/facebook.png" alt="facebook icon" width={26.5} height={26.5} />
              </a>
              <a href="">
                <Image src="/images/linkedin.png" alt="linkedin icon" width={26.5} height={26.5} />
              </a>
            </div>
          </div>
        </div>
        <p className='text-[14px]'>Copyright 2025 CamberFarm.Africa@All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer