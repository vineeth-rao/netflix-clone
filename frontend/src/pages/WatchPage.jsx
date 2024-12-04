import { useParams } from "react-router-dom";
import { UseContentStore } from "../store/content";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import Slider from "../components/Slider";
import { formatReleaseDate } from "../utils/dateFunction";
import WatchPageSkeleton from "../components/WatchPageSkeleton";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState();
  const [currentTrailerIdx, setcurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);

  const nextTrailerIdx = () => {
    if (currentTrailerIdx < trailers.length - 1) {
      setcurrentTrailerIdx((prev) => prev + 1);
    }
  };
  const prevTrailerIdx = () => {
    if (currentTrailerIdx > 0) {
      setcurrentTrailerIdx((prev) => prev - 1);
    }
  };

  const { contentType } = UseContentStore();
  useEffect(() => {
    const getTrailers = async () => {
      try {
        const response = await axios.get(
          `/api/v1/media/${contentType}/${id}/trailers`
        );
        setTrailers(response.data.content);
      } catch (error) {
        console.error("Error fetching content:", error);
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };
    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimiliarContents = async () => {
      try {
        const response = await axios.get(
          `/api/v1/media/${contentType}/${id}/similar`
        );
        setSimilarContent(response.data.content);
      } catch (error) {
        console.error("Error fetching content:", error);
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimiliarContents();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const response = await axios.get(
          `/api/v1/media/${contentType}/${id}/details`
        );
        setContent(response.data.details);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Error fetching content:", error);
        if (error.message.includes("404")) {
          setContent({});
        }
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);


  if (loading) {
    return (
      <div className="min-h-screen relative bg-black text-white">
        <Navbar />
        <div className="py-3 px-10">
          <WatchPageSkeleton />
        </div>
      </div>
    );
  }

  if (Object.keys(content).length === 0) {
    return (
      <div className="bg-black h-screen text-white text-center">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto py-8 px-4 h-full mt-40">
            <div className="sm:text-5xl text-2xl font-bold text-balance">
              No content found
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />
        {trailers?.length > 0 && (
          <div className="aspect-auto flex flex-col sm:flex-row justify-start sm:justify-start  py-12 sm:mt-0 space-y-4 sm:space-y-0">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 rounded-md p-2 justify-items-center ${
                currentTrailerIdx === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={currentTrailerIdx === 0}
              onClick={prevTrailerIdx}
            >
              {/* Icon for large screens */}
              <span className="hidden sm:inline">
                <ChevronLeft className="size-6" />
              </span>

              {/* Text for small screens */}
              <span className="inline sm:hidden">Previous</span>
            </button>
            <div className=" p-2 sm:px-10 md:px-32 w-full">
              {trailers?.length > 0 && (
                <ReactPlayer
                  controls={true}
                  width={"100%"}
                  url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
                  className="mx-auto overflow-hidden rounded-lg"
                />
              )}
            </div>
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 rounded-md p-2 justify-items-center ${
                currentTrailerIdx === trailers?.length - 1
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={currentTrailerIdx === trailers?.length - 1}
              onClick={nextTrailerIdx}
            >
              {/* Icon for large screens */}
              <span className="hidden sm:inline">
                <ChevronRight className="size-6" />
              </span>

              {/* Text for small screens */}
              <span className="inline sm:hidden">Next</span>
            </button>
          </div>
        )}
        {trailers?.length === 0 && (
          <div className="text-center">
            <h2 className="text-xl text-center mt-5">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {content?.title || content?.name}
              </span>
            </h2>
          </div>
        )}

        {/* Content Details  */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-20
        max-w-6xl mx-auto mt-14 mb-10 sm:mb-0"
        >
          <div className="mb-4 mb:md-0">
            <h2 className="text-5xl font-bold text-balance">
              {content?.title || content?.name}
            </h2>
            <p className="mt-2 text-lg">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}
            </p>
            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="Poster Image"
            className="max-h-[550px] rounded-md"
          />
        </div>

        {(similarContent.length > 0) && (
          <div className="mt-10 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold"></h2>
            <Slider
              title={`Similar ${
                contentType == "movie" ? "Movies" : "TV Shows"
              }`}
              content={similarContent}
              contentFormatter={(item) => ({
                id: item.id,
                image: item.poster_path,
                title: item.title || item.name,
              })}
              linkBase="/watch"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
