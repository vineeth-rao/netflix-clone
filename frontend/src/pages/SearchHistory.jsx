import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatDate } from "../utils/dateFunction";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

const SearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const response = await axios.get("/api/v1/search/history");
        setSearchHistory(response.data.content);
      } catch (error) {
        console.error("Error fetching search history:", error);
      }
    };
    getSearchHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/search/history/${id}`);
      toast.success("Deleted Successfully");
      setSearchHistory(searchHistory.filter((entry) => entry.id !== id));
    } catch (error) {
      toast.error("Something went wrong. Try again in sometime.");
      console.error("Error fetching search history:", error);
    }
  };

  if (searchHistory?.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-5">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchHistory.map((entry) => (
            <div
              key={entry.id}
              className="bg-gray-800 rounded-lg flex items-start shadow-md p-4"
            >
              <img
                src={SMALL_IMG_BASE_URL + entry.image}
                alt="History Image"
                className="size-16 rounded-full object-cover mr-2"
              />
              <div className="flex flex-col max-w-30">
                <span className="text-lg font-semibold mb-2">
                  {entry.title.slice(0, 28) +
                    (entry.title.length > 28 ? "..." : "")}
                </span>
                <span className="text-sm text-gray-400">
                  {formatDate(entry.lastSearchDate || entry.createdOn)}
                </span>
              </div>
              <span
                className={`py-1 px-3 min-w-16 text-center rounded-full text-sm ml-auto ${
                  entry.searchType == "movie"
                    ? "bg-red-600"
                    : entry.searchType == "tv"
                    ? "bg-blue-600"
                    : "bg-green-600"
                }`}
              >
                {entry.searchType.slice(0, 1).toUpperCase() +
                  entry.searchType.slice(1)}
              </span>
              <Trash
                className="size-5 ml-2 cursor-pointer hover:fill-red-600 hover:text-red-600"
                onClick={() => handleDelete(entry.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;
