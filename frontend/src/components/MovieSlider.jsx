import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { UseContentStore } from "../store/content";
import axios from "axios";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category }) => {
  const { contentType } = UseContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef(null);
  const formattedCategory =
    category[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
  const formattedContentType = contentType == "movie" ? "Movies" : "TV Shows";

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth * 0.9,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth * 0.9,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/v1/media/${contentType}/${category}`);
      setContent(res.data.content);
    };
    getContent();
  }, [contentType, category]);
  return (
    <div
      className="bg-black text-white relative px-5 md:px-20"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className=" mb-4 text-2xl font-bold">
        {formattedCategory} {formattedContentType}
      </h2>
      {showArrows && (
        <>
          <button
            className="transition-transform ease-in-out delay-300 absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full text-white bg-black/50 hover:bg-opacity-75 z-10"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full text-white bg-black/50 hover:bg-opacity-75 z-10"
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
      >
        {content.map(
          (item) =>
            item.backdrop_path && (
              <Link
                to={`/watch/${item.id}`}
                className="min-w-[250px] relative group"
                key={item.id}
              >
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={`${SMALL_IMG_BASE_URL + item.backdrop_path}`}
                    alt={item.title}
                    className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                  />
                </div>
                <p className="mt-2 text-center">{item.title || item.name}</p>
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default MovieSlider;
