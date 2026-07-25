import { useContext, useEffect } from "react";
import { fetchFeed } from "../services/post.api";
import { PostContext } from "../post.context";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setloading, post, setfeed, feed, setpost } = context;

  const handleFetchFeed = async () => {
    setloading(true);
    const data = await fetchFeed();
    
    
    setfeed(data.posts);
    setloading(false);
  };

  useEffect(() => {
    handleFetchFeed();
  }, []);

  return {
    handleFetchFeed,
    loading,
    feed,
    post,
  };
};
