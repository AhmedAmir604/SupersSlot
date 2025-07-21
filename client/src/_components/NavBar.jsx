import React, { useEffect, useRef, useState } from "react";
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
    <button
      onClick={() => {
        navigate(navigateTo);
        if (toggleMenu) toggleMenu();
      }}
      className={`cursor-pointer flex items-center text-gray-600 text-sm font-medium hover:text-blue-600 
                 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-50 ${className}`}
    >
      <Icon className={`${iconStyle} mr-2`} />
      {label}
    </button>
  );
};

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [extend, setExtend] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await isLoggedIn();

        if (res.data.loggedIn && res.data.user) {
          // console.log(res);
          const { name, photo } = res.data.user;
          setUser({ name: name.split(" ")[0], photo });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
        setUser(null);
      }
    };

    checkLogin();
  }, []);

  useEffect(() => {
    const clickHandler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setExtend(false);
      }
    };

    document.addEventListener("mousedown", clickHandler);
    return () => document.removeEventListener("mousedown", clickHandler);
  }, [menuRef]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {user && (
              <button
                onClick={toggleMenu}
                className="text-2xl text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <RxHamburgerMenu />
              </button>
            )}
          </div>

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer"
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              BookIt
            </div>
          </div>

          {/* Desktop Navigation */}
          {user ? (
            <div className="hidden md:flex items-center space-x-1">
              <NavItem navigateTo="/home" icon={GoHome} label="Home" />
              <NavItem
                navigateTo="/services"
                icon={LuCalendar}
                label="Book Service"
              />
              <NavItem
                navigateTo="/discover"
                icon={IoLocationOutline}
                label="Discover"
              />

              {/* User Profile Dropdown */}
              <div className="relative ml-4" ref={menuRef}>
                <button
                  onClick={() => setExtend(!extend)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <img
                    src={`/users/${user.photo}`}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-blue-200"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </button>

                {extend && (
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">Manage your account</p>
                    </div>
                    <button
                      onClick={logoutHandler}
                      disabled={loading}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 
                               transition-colors duration-200 disabled:opacity-50"
                    >
                      {loading ? "Logging out..." : "Sign out"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => navigate("/login")}
                variant="ghost"
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
                         text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Get Started
              </Button>
            </div>
          )}

          {/* Mobile User Profile */}
          <div className="md:hidden">
            {user && (
              <button
                onClick={() => setExtend(!extend)}
                className="flex items-center space-x-2"
              >
                <img
                  src={`/users/${user.photo}`}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-blue-200"
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {user && (
        <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
      )}

      {/* Mobile User Dropdown */}
      {user && extend && (
        <div className="md:hidden absolute top-16 right-4 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">Manage your account</p>
          </div>
          <button
            onClick={logoutHandler}
            disabled={loading}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 
                     transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? "Logging out..." : "Sign out"}
          </button>
        </div>
      )}
    </nav>
  );
}

const MobileMenu = ({ isOpen, toggleMenu }) => (
  <div
    className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
  >
    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={toggleMenu} />
    <div
      className={`absolute top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            BookIt
          </div>
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
          >
            <IoIosClose className="text-3xl" />
          </button>
        </div>

        <div className="space-y-2">
          <NavItem
            navigateTo="/home"
            icon={GoHome}
            label="Home"
            toggleMenu={toggleMenu}
            className="w-full justify-start text-base py-3"
            iconStyle="text-xl"
          />
          <NavItem
            navigateTo="/services"
            icon={LuCalendar}
            label="Book Service"
            toggleMenu={toggleMenu}
            className="w-full justify-start text-base py-3"
            iconStyle="text-xl"
          />
          <NavItem
            navigateTo="/discover"
            icon={IoLocationOutline}
            label="Discover"
            toggleMenu={toggleMenu}
            className="w-full justify-start text-base py-3"
            iconStyle="text-xl"
          />
        </div>
      </div>
    </div>
  </div>
);
