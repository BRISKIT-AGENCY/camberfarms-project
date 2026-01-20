import React from 'react'
import { useTranslations } from 'next-intl'
import Contact from '../components/Contact'
import Map from '../components/Map'
import Navbar from '../components/Navbar'
import Link from 'next/link'

const page = () => {
    const t= useTranslations("Contact")
    return (
        <div className='w-full'>
            <div className='hidden xl:block'>
                <Navbar logoSrc="/images/logo2.png" linkTextColor="text-black" buttonBgColor="bg-[#1AD329]" buttonTextColor='text-white' />
            </div>
            <div className='md:px-25  md:w-196.75  py-25'>
                <div className='pl-6 md:pl-0 pr-14 md:pr-0 w-full'>
                    <h1 className="md:text-[56px] text-[32px] font-bold text-[#1AD329]">Let's Work Together</h1>
                    <p className="md:text-[18px] text-[16px] mt-2 md:mt-6">Whether you’re a farmer, investor, or organization passionate about sustainable agriculture, we’d love to collaborate with you. Reach out to learn more about our programs, partnerships, and impact-driven initiatives across Africa.</p>
                    <Link href={'contact#contact'} className='mt-12.5 flex'>
                        <p className='bg-[#1AD329] text-white py-2.75 px-4 md:px-6 md:py-4 rounded-[100px] text-[14px] md:text-[24px]'>Get in Touch</p>
                    </Link>
                </div>
            </div>
            <div className='w-full mt-17 bg-[#1AD329] text-white'>
                <div className='md:pl-25 pl-6 py-28'>
                    <div className='flex md:gap-8.25 gap-3 items-center'>
                        <img src="/images/contact-email.png" alt="email logo" className='md:h-12.5 md:w-12.5 h-11 w-11' />
                        <div className='flex flex-col gap-2'>
                            <h3 className='font-bold md:text-[36px] text-[18px]'>Email</h3>
                            <a href="mailto:camberfarmafrica@gmail.com" className='text-[14px] md:text-[20px] hover:underline'>info@camberfarmexport.com</a>
                        </div>
                    </div>
                    <div className='flex md:gap-8.25 gap-3 items-center md:mt-20 mt-12.5'>
                        <img src="/images/contact-phone.png" alt="phone logo" className='md:h-12.5 md:w-12.5 h-11 w-11' />
                        <div className='flex flex-col gap-2'>
                            <h3 className='font-bold md:text-[36px] text-[18px]'>Phone</h3>
                            <a href="tel:+234909746104" className='text-[14px] md:text-[20px] hover:underline'>+234 901 6789 123</a>
                        </div>
                    </div>
                    <div className='flex md:gap-8.25 gap-3 items-center md:mt-20 mt-12.5'>
                        <img src="/images/contact-address.png" alt="address logo" className='md:h-12.5 md:w-12.5 h-11 w-11' />
                        <div className='flex flex-col gap-2'>
                            <h3 className='font-bold md:text-[36px] text-[18px]'>Address</h3>
                            <p className='text-[14px] md:text-[20px]'>123 Trade Zone, Lagos, Nigeria</p>
                        </div>
                    </div>
                    <div className='flex md:gap-8.25 gap-3 items-center md:mt-20 mt-12.5'>
                        <img src="/images/contact-time.png" alt="time logo" className='md:h-12.5 md:w-12.5 h-11 w-11' />
                        <div className='flex flex-col gap-2'>
                            <h3 className='font-bold md:text-[36px] text-[18px]'>Business Hours</h3>
                            <p className='text-[14px] md:text-[20px]'>Monday - Friday | 8:00 AM - 6:00 PM</p>
                        </div>
                    </div>
                </div>

            </div>
            <div id='contact'>
                <Contact heading={t('heading2')} description={t('description2')} button={t('sendButton2')} placeholder={t('placeholders.message2')}/>
            </div>
            <div className=''>
                <Map />
            </div>

        </div>
    )
}

export default page