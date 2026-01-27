import Navbar from "./Navbar"
import HeroMain from "./HeroMain"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/images/hero-bg.png"
        alt="Hero background"
        fill
        priority
        quality={80}
        className="object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10">
        <div className="hidden xl:block">
          <Navbar logoSrc="/images/logo.png" />
        </div>
        <div className="flex pb-56 w-full">
          <HeroMain />
        </div>
      </div>
    </div>

  )
}

export default Hero