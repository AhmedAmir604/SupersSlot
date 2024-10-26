import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoHome } from "react-icons/go";
import { LuCalendar } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { isLoggedIn, logout } from "@/handlers/authHandler";
import { IoIosClose } from "react-icons/io";
import { Button } from "@/components/ui/button";

const NavItem = ({
  navigateTo,
  icon: Icon,
  label,
  toggleMenu,
  className = "",
  iconStyle = "",
}) => {
  const navigate = useNavigate();

  return (
    <a
      onClick={() => {
        navigate(navigateTo);
        if (toggleMenu) toggleMenu();
      }}
      className={`cursor-pointer flex items-center text-gray-500 text-sm font-semibold hover:text-[#3ba4f5] ${className}`}
    >
      <Icon className={`${iconStyle} mr-1`} />
      {label}
    </a>
  );
};

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [extend, setExtend] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    setLoading(true); // Start loading state
    try {
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/login");
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await isLoggedIn();
        if (res.data.user) {
          const { name, photo } = res.data.user;
          setUser({ name: name.split(" ")[0], photo });
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkLogin();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-30 bg-white border-b border-gray-200 py-2 px-4 lg:px-20 flex justify-between items-center">
      <div className="md:hidden flex justify-between w-full px-4 items-center">
        <button
          onClick={toggleMenu}
          className="text-2xl text-gray-500 hover:text-[#3ba4f5]"
        >
          <RxHamburgerMenu />
        </button>
        {user && (
          <div className="flex items-center relative">
            <img
              onClick={() => setExtend(!extend)}
              src={`/users/${user.photo}`}
              alt="User"
              className="cursor-pointer w-12 h-12 rounded-full"
            />
            <span className="ml-2 text-gray-500 text-sm font-semibold">
              {user.name}
            </span>
            <div
              className={`absolute transition-all duration-300 flex flex-col gap-6 top-16 bg-white/20 px-4 rounded-xl py-6 ${
                extend
                  ? "opacity-100 max-h-fit translate-y-0"
                  : "opacity-0 max-h-0 select-none -translate-y-[20px]"
              }`}
            >
              <Button
                onClick={logoutHandler}
                className={`bg-red-700 hover:bg-red-600 transition-opacity duration-300 my-2 mx-auto ${
                  loading ? "opacity-50" : "opacity-100"
                }`}
                disabled={!extend || loading}
              >
                {loading ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:block text-2xl text-gray-500">MyBrand</div>

      {user ? (
        <div className="hidden md:flex px-4 gap-6 items-center">
          <NavItem navigateTo="/home" icon={GoHome} label="HOME" />
          <NavItem
            navigateTo="/home"
            icon={LuCalendar}
            label="SCHEDULE AN APPOINTMENT"
          />
          <NavItem
            navigateTo="/location"
            icon={IoLocationOutline}
            label="FIND OFFICE"
          />
          <div className="flex items-center gap-2">
            <img
              onClick={() => setExtend(!extend)}
              src={`/users/${user.photo}`}
              alt="User"
              className="w-12 h-12 rounded-full cursor-pointer"
            />
            <span className="text-sm text-gray-500 font-semibold">
              {user.name}
            </span>
            <div
              className={`absolute  transition-all duration-300 flex flex-col gap-6 top-16 bg-white/20 px-4 rounded-xl ${
                extend
                  ? "opacity-100 max-h-full translate-y-0"
                  : "opacity-0 max-h-full -translate-y-[20px]"
              }`}
            >
              <Button
                disabled={!extend || loading}
                onClick={logoutHandler}
                className={`bg-red-700 hover:bg-red-600 transition-opacity duration-300 my-2 mx-auto ${
                  loading ? "opacity-50 " : "opacity-100"
                }`}
              >
                {loading ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Button onClick={() => navigate("/signup")} className="bg-blue-600">
            Signup
          </Button>
          <Button onClick={() => navigate("/login")} className="bg-blue-600">
            Login
          </Button>
        </div>
      )}

      <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} user={user} />
    </nav>
  );
}

const MobileMenu = ({ isOpen, toggleMenu, user }) => (
  <div
    className={`absolute top-0 left-0 h-screen w-full bg-white flex flex-col items-center justify-center pb-24 gap-8 transition-all duration-300
      ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"}
      ${isOpen ? "visible" : "invisible"}`}
  >
    <button
      onClick={toggleMenu}
      className="text-gray-500 absolute top-10 right-10 hover:text-[#3ba4f5] text-5xl"
    >
      <IoIosClose />
    </button>
    <NavItem
      navigateTo="/home"
      icon={GoHome}
      label="HOME"
      toggleMenu={toggleMenu}
      iconStyle="text-2xl"
    />
    <NavItem
      navigateTo="/booking"
      icon={LuCalendar}
      label="SCHEDULE AN APPOINTMENT"
      toggleMenu={toggleMenu}
      iconStyle="text-2xl"
    />
    <NavItem
      navigateTo="/location"
      icon={IoLocationOutline}
      label="FIND OFFICE"
      toggleMenu={toggleMenu}
      iconStyle="text-2xl"
    />
  </div>
);
