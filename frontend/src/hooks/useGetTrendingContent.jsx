import { useEffect, useState } from "react";
import { UseContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = UseContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        const res = await axios.get(`/api/v1/media/${contentType}/trending`);
        setTrendingContent(res.data.content);
      } catch (error) {
        console.error("Error fetching trending content:", error);
      }
    };
    // Fetch the trending content immediately when the component mounts
    getTrendingContent();
    // For changing trending content every 10 seconds uncomment below
    // const interval = setInterval(() => {
    //   getTrendingContent();
    // }, 10000); // 10000 ms = 10 seconds

    // // Cleanup the interval when component unmounts
    // return () => clearInterval(interval);
  }, [contentType]);

  return { trendingContent };
};

export default useGetTrendingContent;
