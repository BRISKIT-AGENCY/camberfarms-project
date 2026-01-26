'use client'

import { usePathname } from 'next/navigation'
import BlogHeader from './BlogHeader'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'

interface NavbarProps {
  logoSrc: string
  linkTextColor?: string
  buttonBgColor?: string
  buttonTextColor?: string
}

const Navbar = ({
  logoSrc,
  linkTextColor = 'text-white',
  buttonBgColor = 'bg-white',
  buttonTextColor = 'text-[#1AD329]'
}: NavbarProps) => {
  const pathname = usePathname()

  // ✅ Homepage detection (supports locale routing)
  const isHomePage =
    pathname === '/' || pathname.match(/^\/(en|fr|es|pt|it|de|nl|ru|ar|zh)$/)

  return (
    <div>
      {/* ✅ Show BlogHeader ONLY on homepage */}
      {isHomePage && <BlogHeader />}

      <div className="relative mx-12.5 xl:py-8 py-5">
        <DesktopNavbar
          logoSrc={logoSrc}
          linkTextColor={linkTextColor}
          buttonBgColor={buttonBgColor}
          buttonTextColor={buttonTextColor}
        />
        <MobileNavbar />
      </div>
    </div>
  )
}

export default Navbar
