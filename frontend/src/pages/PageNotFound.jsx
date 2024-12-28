import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: `url('/404.png')` }}
    >
      <header className="absolute top-0 left-0 p-4 bg-black w-full">
        <Link to={"/"}>
          <img src="/jetflix-logo.png" alt="Jetflix" className="h-8" />
        </Link>
      </header>
      <main
        className="text-center error-page--content z-10"
        aria-label="404 Not Found"
      >
        <h1 className="text-6xl font-bold mb-4">Lost your way?</h1>
        <p className="text-2xl mb-8">Page Not Found</p>
        <p className="text-lg mb-8">
          Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the
          home page.
        </p>
        <Link to={"/"} className="bg-white text-black py-2 px-4 rounded">
          Home
        </Link>
      </main>
    </div>
  );
};

export default PageNotFound;
