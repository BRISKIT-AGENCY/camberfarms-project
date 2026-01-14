'use client'
import Impact from "../components/Impact"
import Partnership from "../components/Partnership"
import Navbar from "../components/Navbar"
import Image from "next/image"
import { useTranslation } from "react-i18next"

const About = () => {
  const { t } = useTranslation("about")

  return (
    <div className="w-full">
      <div className="hidden xl:block">
        <Navbar
          logoSrc="/images/logo2.png"
          linkTextColor="text-black"
          buttonBgColor="bg-[#1AD329]"
          buttonTextColor="text-white"
        />
      </div>

      <div className="lg:px-25 px-6 pb-28.5">
        <div className="md:px-23.25 flex flex-col items-center justify-center text-center">
          <h1 className="md:text-[56px] text-[32px] font-bold text-[#1AD329]">
            {t("hero.title")}
          </h1>

          <p className="md:text-[18px] text-[16px] mt-2">
            {t("hero.description")}
          </p>

          <button
            type="submit"
            className="mt-9"
          >
            <p className="md:text-[24px] font-bold bg-[#1AD329] text-white py-2.75 px-11.25 rounded-[100px] text-[14px]">
              {t("hero.cta")}
            </p>
          </button>
        </div>

        {/* Mobile image */}
        <Image
          src="/images/about-herosm.png"
          alt={t("images.mobileAlt")}
          width={768}
          height={264}
          className="w-full h-86.75 object-cover sm:hidden mt-8"
        />

        {/* Desktop image */}
        <Image
          src="/images/about-hero.png"
          alt={t("images.desktopAlt")}
          width={1920}
          height={524}
          className="hidden sm:block w-full h-auto object-cover md:mt-12.5"
        />

        {/* Our Story (mobile only) */}
        <div className="md:hidden py-14">
          <h1 className="font-bold text-[24px] text-[#1AD329]">
            {t("story.title")}
          </h1>

          <p className="text-[24px] mt-8">{t("story.p1")}</p>
          <p className="text-[24px] mt-4">{t("story.p2")}</p>
          <p className="text-[24px] mt-4">{t("story.p3")}</p>
        </div>

        <div  className="sm:mt-68.25">
          {/* Mission */}
          <div id="mission">
            <div className="md:border-l-10 border-l-5 border-[#FF741F] pl-9">
              <h2  className="font-bold text-[24px] md:text-[50px] text-[#1AD329]">
                {t("mission.title")}
              </h2>
            </div>

            <p className="text-[14px] md:text-[36px] mt-8 md:mt-12.5">
              {t("mission.description")}
            </p>
          </div>

          {/* Vision */}
          <div id="vision" className="mt-12.5 md:mt-37.5">
            <div className="md:border-l-10 border-l-5 border-[#FF741F] pl-9">
              <h2 className="font-bold text-[24px] md:text-[50px] text-[#1AD329]">
                {t("vision.title")}
              </h2>
            </div>

            <p className="text-[14px] md:text-[36px] mt-8 md:mt-12.5">
              {t("vision.description")}
            </p>
          </div>

          {/* Core Values */}
          <div id='values' className="mt-12.5 md:mt-37.5">
            <div className="md:border-l-10 border-l-5 border-[#FF741F] pl-9">
              <h2 className="font-bold text-[24px] md:text-[50px] text-[#1AD329]">
                {t("values.title")}
              </h2>

              <p className="text-[14px] md:text-[36px] mt-8 md:mt-12.5">
                {t("values.intro")}
              </p>
            </div>
          </div>

          {/* Values list */}
          <div id='values'>
            {["empowerment", "sustainability", "integrity", "innovation", "excellence"].map(
            (key) => (
              <ul
                key={key}
                className="list-disc list-outside pl-5 md:mt-12.5 mt-6 text-[14px] md:text-[36px]"
              >
                <li>
                  <span className="block mt-2">
                    {t(`values.items.${key}.title`)}
                  </span>
                  <p className="mt-2">
                    {t(`values.items.${key}.description`)}
                  </p>
                </li>
              </ul>
            )
          )}
          </div>
        </div>
      </div>

      <Impact
        bgColor="#1AD329"
        hColor="#FFFFFF"
        pColor="#FFFFFF"
        p2Color="#FFFFFF"
        border="border-[#FFFFFF]"
      />

      <Partnership />
    </div>
  )
}

export default About
