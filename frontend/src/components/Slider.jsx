import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SMALL_IMG_BASE_URL } from "../utils/constants";

const Slider = ({
  title,
  content,
  contentFormatter,
  linkBase,
  itemWidth = 250,
}) => {
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef(null);

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

  return (
    <div
      className="bg-black text-white relative"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      {showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 flex items-center justify-center size-12 rounded-full text-white bg-black/50 hover:bg-opacity-75 z-10"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 flex items-center justify-center size-12 rounded-full text-white bg-black/50 hover:bg-opacity-75 z-10"
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
        {content.map((item) => {
          const { id, image, title } = contentFormatter(item);
          if (image && id && title)
            return (
              <Link
                to={`${linkBase}/${id}`}
                className="min-w-[250px] relative group"
                key={id}
                style={{ minWidth: `${itemWidth}px` }}
              >
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={`${SMALL_IMG_BASE_URL}${image}`}
                    alt={title}
                    className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                  />
                </div>
                <p className="mt-2 text-center">{title}</p>
              </Link>
            );
        })}
      </div>
    </div>
  );
};

export default Slider;
