import Navbar from "./Navbar"
import HeroMain from "./HeroMain"

const Hero = () => {
  return (
    <div className="relative h-fit w-full bg-[url('/images/hero-bg.png')] bg-cover bg-center flex flex-col justify-center">
  {/* Gradient overlay covering the entire image */}
  <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/70" />

  {/* Content stays above the gradient */}
  <div className="relative z-10">
    <div className="hidden xl:block">
          <Navbar logoSrc="/images/logo.png"/>
        </div>
    <div className="flex pb-56 w-full">
        <HeroMain />
    </div>
    
  </div>
</div>

  )
}

export default Hero