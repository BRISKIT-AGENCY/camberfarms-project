
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import Link from 'next/link'

const WhoWeAre = async() => {
  const t = await getTranslations('WhoWeAre')

  return (
    <div className='h-fit w-full px-6 pt-10'>
      <div className='w-full h-full '>
        <h1 className='md:text-[48px] text-[32px] font-bold'>
          {t('title')}
        </h1>

        <p className='md:text-[36px] text-[16px] md:mt-12.5 mt-7'>
          <span className='md:text-[100px] text-[50px] text-[#FF741F] leading-0'>“</span>
          {t('description')}
        </p>

        <Link href='/about' className='flex mt-6 text-[#1AD329] cursor-pointer'>
          <p className='md:text-[24px] text-[16px]'>
            {t('buttonText')}
          </p>
          <Image
            src="/images/greenarrow.png"
            alt="arrow right"
            width={24}
            height={24}
            className="ml-2"
          />
        </Link>
      </div>
    </div>
  )
}

export default WhoWeAre