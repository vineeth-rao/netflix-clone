import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Info, Play } from "lucide-react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
} from "../../utils/constants";
import { UseContentStore } from "../../store/content";
import MovieSlider from "../../components/MovieSlider";
import { useState } from "react";
import ShimmerEffect from "../../components/ShimmerEffect";

function HomeScreen() {
  const { trendingContent } = useGetTrendingContent();
  const { contentType } = UseContentStore();
  const [imageLoading, setImageLoading] = useState(true);
  
  if (!trendingContent) {
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <ShimmerEffect />
      </div>
    );
  }
  return (
    <>
      <div className="relative h-screen text-white">
        <Navbar />
        {imageLoading && <ShimmerEffect />}

        {/* Hero image */}
        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="Hero img"
          className="absolute top-0 left-0 w-full h-full object-cover -z-50"
          onLoad={() => setImageLoading(false)}
        />

        {/* backdrop */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-black/40 to-black/0 -z-50"
          aria-hidden="true"
        />

        {/* Title */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div
            className="bg-gradient-to-b from-black via-transparent to-transparent
                    absolute w-full h-full top-0 left-0 -z-10 opacity-20 "
          />

          <div className="max-w-2xl">
            <h1 className="mt-4 text-5xl md:text-6xl font-extrabold text-balance">
              {trendingContent?.title || trendingContent?.name}
            </h1>
            <p className="text-lg mt-2">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date?.split("-")[0]}{" "}
              • {trendingContent?.adult ? "18+" : "PG-13"} •{" "}
              {trendingContent?.media_type == "movie"? "Movie": "TV Show"}
            </p>
            <p className="text-lg mt-4">
              {trendingContent?.overview.length > 200
                ? trendingContent?.overview.slice(0, 200) + "..."
                : trendingContent?.overview}
            </p>
          </div>
          <div className="flex mt-8">
            <Link
              to={`/watch/${trendingContent.id}`}
              className="bg-white hover:bg-white/80 font-bold rounded text-black py-2 px-4 mr-4 text-center flex items-center"
            >
              <Play className="fill-black mr-2 size-6" /> Play
            </Link>
            <Link
              to={"/watch/123"}
              className="bg-gray-500/70  hover:bg-gray-500 font-bold text-white rounded  py-2 px-4 text-center flex items-center"
            >
              <Info className="mr-2 size-6" /> More Info
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 bg-black py-10">
        {contentType == "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
}

export default HomeScreen;
