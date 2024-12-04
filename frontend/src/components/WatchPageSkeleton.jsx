const WatchPageSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 w-40 h-6 mb-4 shimmer"></div>
      <div className="bg-gray-300 w-full h-96 mb-4 shimmer"></div>
      <div className="bg-gray-300 w-3/4 h-6 mb-4 shimmer"></div>
      <div className="bg-gray-300 w-1/2 h-6 mb-4 shimmer"></div>
      <div className="bg-gray-300 w-full h-24 shimmer"></div>
    </div>
  );
};

export default WatchPageSkeleton;
