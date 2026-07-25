import "../style/feeds.scss";
import Post from "../components/post";
import { usePost } from "../hooks/usePost";





function Feed() {

  const {loading, feed} = usePost()
  if(loading || !feed){
    return <main><h1>Loading....</h1></main>
  }

  

console.log(feed);


  return (
    <div className="feed">
      {feed.map((post,idx) => (
        <Post key={idx} post={post} user={post.user}/>
      ))}
    </div>
  );
}

export default Feed;