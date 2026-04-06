import React from 'react'
import { useTranslations } from 'next-intl'
import Contact from '../components/Contact'
import Map from '../components/Map'
import Navbar from '../components/Navbar'
import Link from 'next/link'

const page = () => {
    const t = useTranslations("Contact")
    const v = useTranslations("ContactPage")
    return (
        <div className='w-full'>
            <div className='hidden xl:block'>
                <Navbar logoSrc="/images/logo2.png" linkTextColor="text-black" buttonBgColor="bg-[#1AD329]" buttonTextColor='text-white' />
            </div>
            <div className="w-full px-10 md:px-20 py-20 lg:pt-36">
                <h1
                    className="font-poppins capitalize font-bold text-primary text-2xl sm:text-3xl lg:text-4xl"
                    id="contact"
                >
                    {v('title')}
                </h1>
                <p className="text-sm max-w-xl mt-4 lg:text-base lg:max-w-2xl">
                    {v('description')}
                </p>
                <Link
                    href={'contact#message'}
                    className="w-fit mt-6 flex items-center justify-center px-6 py-2 rounded-full capitalize bg-[#1AD329] text-white font-sans font-medium cursor-pointer hover:bg-primary/70 transition-colors ease-in-out"
                >
                    {v('button')}
                </Link>
            </div>
            <section className="w-full py-20 px-10 md:px-20 bg-[#1AD329] text-white flex flex-col items-start gap-5">
                {/* Email */}
                <div className="flex items-center gap-5">
                    <img
                        src="/images/contact-email.png"
                        alt="email logo"
                        width={50}
                        height={50}
                        className="bg-secondary rounded-full object-fill w-8 aspect-square"
                    />
                    <div>
                        <h6 className="font-poppins font-semibold text-lg capitalize">{v('email')}</h6>
                        <a
                            href="mailto:camberwallresorts@gmail.com"
                            className="text-sm text-light-grey hover:underline"
                        >
                            camberwallresorts@gmail.com
                        </a>
                    </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-5">
                    <img
                        src="/images/contact-phone.png"
                        alt="phone logo"
                        width={50}
                        height={50}
                        className="bg-secondary rounded-full object-fill w-8 aspect-square"
                    />
                    <div className='flex flex-col'>
                        <h6 className="font-poppins font-semibold text-lg capitalize">{v('phone')}</h6>
                        <a href="tel:+2348062741841" className="text-sm text-light-grey hover:underline">
                            +234 806 274 1841
                        </a>
                        <a href="tel:+2348133486885" className="text-sm text-light-grey hover:underline">
                            +234 813 348 6885
                        </a>
                    </div>
                </div>

                {/* Address */}
                <div className="flex items-center gap-5">
                    <img
                        src="/images/contact-address.png"
                        alt="address logo"
                        width={50}
                        height={50}
                        className="bg-secondary rounded-full object-fill w-8 aspect-square"
                    />
                    <div>
                        <h6 className="font-poppins font-semibold text-lg capitalize">{v('address')}</h6>
                        <address className="text-sm text-light-grey not-italic">
                            Graceland Plaza, by Mobil Junction along Nkpolu-Rumuigbo east west road, Port Harcourt Rivers State Nigeria.
                        </address>
                    </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-center gap-5">
                    <img
                        src="/images/contact-time.png"
                        alt="time logo"
                        width={50}
                        height={50}
                        className="bg-secondary rounded-full object-fill w-8 aspect-square"
                    />
                    <div>
                        <h6 className="font-poppins font-semibold text-lg capitalize">{v('businessHours')}</h6>
                        <time className="text-sm text-light-grey">
                            {v('days')} | 8:00 AM - 6:00 PM
                        </time>
                    </div>
                </div>
            </section>
            <div id='contact'>
                <Contact heading={t('heading2')} description={t('description2')} button={t('sendButton2')} placeholder={t('placeholders.message2')} />
            </div>
            <div className=''>
                <Map />
            </div>

        </div>
    )
}

export default page