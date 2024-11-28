import { useEffect, useState } from "react";
import { UseContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = UseContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      const res = await axios.get(`/api/v1/media/${contentType}/trending`);
      setTrendingContent(res.data.content);
    };
    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};

export default useGetTrendingContent;
