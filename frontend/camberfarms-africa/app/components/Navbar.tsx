import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {

  return (
    <div className="relative mx-12.5 xl:py-8 py-5">
        <DesktopNavbar />
        <MobileNavbar />
    </div>
  );
};

export default Navbar;
