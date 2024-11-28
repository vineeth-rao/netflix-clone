import { UseContentStore } from "../store/content"

const MovieSlider = ({category}) => {
    const {contentType} = UseContentStore();
    const formattedCategory = category[0].toUpperCase() + category.replaceAll("_"," ").slice(1);
    const formattedContentType = contentType == "movie" ? "Movies" : "TV Shows";
  return (
    <div className="bg-black text-white relative px-5 md:px-20">
        <h2>
        {formattedCategory} {formattedContentType}
        </h2>
    </div>
  )
}

export default MovieSlider