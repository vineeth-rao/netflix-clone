import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import { useState } from "react";
import { UseContentStore } from "../store/content";
import toast from "react-hot-toast";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [activeTab, setActtiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { setContentType } = UseContentStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/api/v1/search/${activeTab}/${searchTerm}`
      );
      setResults(response.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "Nothing Found, make sure you are searching under the right category"
        );
      } else {
        toast.error("An error occured. Please try again later");
      }
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <>
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center gap-4  mb-5">
            <button
              className={`${
                activeTab == "movie"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-800 hover:bg-gray-900"
              } py-2 px-4 rounded`}
              onClick={() => setActtiveTab("movie")}
            >
              Movies
            </button>
            <button
              className={`${
                activeTab == "tv"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-800 hover:bg-gray-900"
              } py-2 px-4 rounded`}
              onClick={() => setActtiveTab("tv")}
            >
              TV Shows
            </button>
            <button
              className={`${
                activeTab == "person"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-800 hover:bg-gray-900"
              } py-2 px-4 rounded`}
              onClick={() => setActtiveTab("person")}
            >
              Person
            </button>
          </div>
          <form
            className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              className="w-full bg-gray-800 p-2 rounded text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                "Search for a " +
                (activeTab == "tv"
                  ? "TV Show"
                  : activeTab.charAt(0).toUpperCase() + activeTab.slice(1))
              }
            />
            <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
              <Search className="size-6" />
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl justify-items-center-center">
            {results.map(
              (item) =>
                (item.poster_path || item.profile_path) && (
                  <div
                    key={item.id}
                    className="flex flex-col bg-gray-700 rounded-lg overflow-hidden shadow-md"
                  >
                    <img
                      src={
                        ORIGINAL_IMG_BASE_URL +
                        (item.poster_path || item.profile_path)
                      }
                      alt={item.title || item.name}
                      className="w-full h-full object-contain"
                    />
                    <div className="flex-grow p-4 flex flex-col justify-between">
                      <h2 className="text-center text-lg font-bold text-white mb-2">
                        {item.title || item.name}
                      </h2>
                      {activeTab !== "person" && (
                        <Link to={`/watch/${item.id}`}>
                          <button
                            className="mt-auto bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md w-full transition duration-300"
                            onClick={() => {
                              setContentType(activeTab);
                            }}
                          >
                            Watch
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
