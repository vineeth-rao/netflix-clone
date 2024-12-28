import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { UseContentStore } from "../store/content";
const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { setContentType } = UseContentStore();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <Link to={"/"} className="z-50">
        <img src="/jetflix-logo.png" alt="Logo" className="w-32 sm:w-40" />
      </Link>

      {/* desktop menu */}
      <div className="hidden sm:flex gap-5 items-center z-50">
        <Link
          to={"/"}
          className="hover:underline"
          onClick={() => setContentType("movie")}
        >
          Movies
        </Link>
        <Link
          to={"/"}
          className="hover:underline"
          onClick={() => setContentType("tv")}
        >
          TV Shows
        </Link>
        <Link to={"/history"} className="hover:underline">
          Search History
        </Link>
      </div>

      <div className="flex gap-5 items-center z-50">
        <Link to={"/search"} className="hover:underline">
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img src={user.image} alt="avatar" className="size-6" />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* Mobile menu */}

      <div
        className={`sm:hidden absolute top-20 left-2 right-2 bg-black p-4 z-40 transition-all duration-300 ease-in-out border rounded border-gray-500 ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <Link
          to={"/"}
          className="block hover:underline p-2"
          onClick={() => {
            setContentType("movie");
            toggleMobileMenu();
          }}
        >
          Movies
        </Link>
        <Link
          to={"/"}
          className="block hover:underline p-2"
          onClick={() => {
            setContentType("tv");
            toggleMobileMenu();
          }}
        >
          TV Shows
        </Link>
        <Link
          to={"/history"}
          className="block hover:underline p-2"
          onClick={() => {
            toggleMobileMenu();
          }}
        >
          Search History
        </Link>
      </div>
      {/* <div className="w-full sm:hidden mt-4 z-50 bg-black rounder border-gray-500">
        <Link to={"/movies"} className="block hover:underline p-2" onClick={toggleMobileMenu}>
          Movies
        </Link>
        <Link to={"/tvShows"} className="block hover:underline p-2" onClick={toggleMobileMenu}>
          TV Shows
        </Link>
        <Link to={"/searchHistory"} className="block hover:underline p-2" onClick={toggleMobileMenu}>
          Search History
        </Link>
      </div> */}
    </header>
  );
};

export default Navbar;
