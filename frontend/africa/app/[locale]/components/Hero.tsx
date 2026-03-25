import Navbar from "./Navbar"
import HeroMain from "./HeroMain"
import Image from "next/image"
import heroBg from "@/public/images/hero-bg.webp"


const Hero = () => {
  return (
    <div className="relative w-full min-h-[calc(100vh-90px)] mb-10">
      <Image
        src={heroBg}
        alt="Hero background"
        fill
        priority
        quality={70}
        sizes="100vw"
        className="object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full">
        <div className="hidden xl:block">
          <Navbar logoSrc="/images/logo.png" />
        </div>
        <div className="flex pb-10 w-full justify-center items-center">
          <HeroMain />
        </div>
      </div>
    </div>

  )
}

export default Hero