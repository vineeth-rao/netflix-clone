import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    navigate("/signup?email=" + email);
  };
  return (
    <div className="hero-bg relative">
      {/* Navbar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <img src="/netflix-logo.png" alt="logo" className="w-32 md:w-52" />
        <Link to={"/login"} className="text-white bg-red-600 py-1 px-2 rounded">
          Login
        </Link>
      </header>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="text-lg mb-4">Watch anywhere. Cancel anytime.</p>
        <p className="mb-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <form
          className="flex flex-col md:flex-row gap-4 w-1/2"
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            placeholder="Email address"
            className="p-2 rounded flex-1 bg-black/80 border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-red-600 text-xl lg:text=2xl py-1 md:py-2 px-2 lg:px-6 rounded flex justify-center hover:bg-red-700 items-center">
            Get Started <ChevronRight className="size-8 md:size-10" />{" "}
          </button>
        </form>
      </div>
      {/* Seperator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />
      {/* 1st section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-5xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Enjoy on your TV.
            </h2>
            <p className="text-lg md:text-xl mb-4">
              Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </p>
          </div>
          <div className="flex-1 relative">
            <img src="/tv.png" alt="Tv image" className="mt-4 z-10 relative" />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      {/* Seperator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />
      {/* 2nd section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
          {/* left side */}
          <div className="flex-1">
            <div className="relative">
              <img
                src="/stranger-things-lg.png"
                alt="Stranger Things image"
                className="mt-4"
              />
              <div
                className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black 
              w-3/4 lg:w-1/2 h-20 border border-slate-500 rounder-md px-2"
              >
                <img
                  src="/stranger-things-sm.png"
                  alt="image"
                  className="h-full"
                />
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-0">
                    <span className="text-sm lg:text-lg font-bold">
                      Stranger Things
                    </span>
                    <span className="text-sm text-blue-500">
                      Downloading...
                    </span>
                  </div>
                  <img src="/download-icon.gif" alt="" className="h-12" />
                </div>
              </div>
            </div>
          </div>
          {/* right side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Download your shows to watch offline
            </h2>
            <p className="text-lg md:text-xl mb-4">
              Save your favourites easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>
      {/* Seperator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />
      {/* 3rd section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-5xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Watch everywhere.
            </h2>
            <p className="text-lg md:text-xl mb-4">
              Stream Unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </p>
          </div>
          <div className="flex-1 relative overflow-hidden">
            <img
              src="/device-pile.png"
              alt="Tv image"
              className="mt-4 z-10 relative"
            />
            <video
              className="absolute top-10 left-1/2 -translate-x-1/2  h-1/2 w-[63%]"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      {/* Seperator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />
      {/* 2nd section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
          {/* left side */}
          <div className="flex-1">
            <div className="relative">
              <img
                src="/kids.png"
                alt="Stranger Things image"
                className="mt-4"
              />
            </div>
          </div>
          {/* right side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Create profiles for kids.
            </h2>
            <p className="text-lg md:text-xl mb-4">
              Send kids on adventures with their favorite characters in a space
              made just for them―free with your membership
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
