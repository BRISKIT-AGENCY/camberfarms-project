import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

interface NavbarProps {
  logoSrc: string;
  linkTextColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const Navbar = ({
  logoSrc,
  linkTextColor = 'text-white',
  buttonBgColor = 'bg-white',
  buttonTextColor = 'text-[#1AD329]'
}: NavbarProps) => {

  return (
    <div className="relative mx-12.5 xl:py-8 py-5">
        <DesktopNavbar logoSrc={logoSrc} linkTextColor={linkTextColor} buttonBgColor={buttonBgColor} buttonTextColor={buttonTextColor} />
        <MobileNavbar />
    </div>
  );
};

export default Navbar;
