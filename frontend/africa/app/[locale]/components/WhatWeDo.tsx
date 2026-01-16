
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

const WhatWeDo = async () => {
    const t = await getTranslations('WhatWeDo') // namespace "whatWeDo"

    return (
        <div className='h-fit sm:h-326.75 w-full px-3 lg:px-25 lg:py-42.75 py-21'>
            <div className='w-full h-full flex flex-col items-center'>
                <h1 className='font-bold text-[24px] md:text-[46px]'>{t('title')}</h1>

                <div className='md:mt-25 mt-12.5'>
                    <div className='flex md:flex-row flex-col md:gap-50 gap-12.5'>
                        {/* Item 1 */}
                        <div className='md:w-1/2'>
                            <div>
                                <Image src="/images/whatwedo1.png" alt="what we do 1" width={60} height={60} className="w-11 h-11 md:w-15 md:h-15" />
                            </div>
                            <h2 className='mt-6 md:mt-9 md:text-[32px] text-[18px] font-medium'>{t('item1.title')}</h2>
                            <p className='mt-3 md:mt-4 md:text-[18px] text-[14px]'>{t('item1.description')}</p>
                        </div>

                        {/* Item 2 */}
                        <div className='md:w-1/2'>
                            <div>
                                <Image src="/images/whatwedo2.png" alt="what we do 2" width={60} height={60} className="w-11 h-11 md:w-15 md:h-15" />
                            </div>
                            <h2 className='mt-6 md:mt-9 md:text-[32px] text-[18px] font-medium'>{t('item2.title')}</h2>
                            <p className='mt-3 md:mt-4 md:text-[18px] text-[14px]'>{t('item2.description')}</p>
                        </div>
                    </div>

                    <div className='flex md:flex-row flex-col md:gap-50 gap-12.5 mt-25'>
                        {/* Item 3 */}
                        <div className='md:w-1/2'>
                            <div>
                                <Image src="/images/whatwedo3.png" alt="what we do 3" width={60} height={60} className="w-11 h-11 md:w-15 md:h-15" />
                            </div>
                            <h2 className='mt-6 md:mt-9 md:text-[32px] text-[18px] font-medium'>{t('item3.title')}</h2>
                            <p className='mt-3 md:mt-4 md:text-[18px] text-[14px]'>{t('item3.description')}</p>
                        </div>

                        {/* Item 4 */}
                        <div className='md:w-1/2'>
                            <div>
                                <Image src="/images/whatwedo4.png" alt="what we do 4" width={60} height={60} className="w-11 h-11 md:w-15 md:h-15" />
                            </div>
                            <h2 className='mt-6 md:mt-9 md:text-[32px] text-[18px] font-medium'>{t('item4.title')}</h2>
                            <p className='mt-3 md:mt-4 md:text-[18px] text-[14px]'>{t('item4.description')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhatWeDo