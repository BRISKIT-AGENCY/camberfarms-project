
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

const HeroMain = async () => {
  const t = await getTranslations('Hero')

  return (
    <div className="mt-2 mx-5 sm:mx-6 md:mx-12 lg:mx-20 xl:mx-52.5 flex flex-col items-center text-center">
      <h1 className="text-white text-2xl md:text-6xl font-bold md:leading-20 leading-10 mt-10 md:mt-0">
        {t('title')}
      </h1>

      <p className="text-white text-[20px] md:text-[22px] mt-4.5 font-medium">
        {t('subtitle')}
      </p>

      <Link href="/our-works" className="mt-12.5">
        <p className="bg-[#1AD329] text-white py-2 px-4 rounded-[100px] font-bold md:font-extrabold text-[14px] md:text-[18px]">
          {t('cta')}
        </p>
      </Link>
    </div>
  )
}

export default HeroMain