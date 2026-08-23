import "../style/feeds.scss";
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaPaperPlane,
  FaRegBookmark,
} from "react-icons/fa";

function Post({ post, user }) {
  return (
    <div className="post">
      <div className="post__header">
        <div className="user">
          <img src={user.profile_image} alt="" />
          <span>{user.username}</span>
        </div>

        <span className="dots">•••</span>
      </div>

      <div className="post__image">
        <img src={post.image} alt="" />
      </div>

      <div className="post__actions">
        <div className="left">
          {post.isLiked ? (
            <FaHeart className="liked" />
          ) : (
            <FaRegHeart className="heart" />
          )}
          <FaRegComment />
          <FaPaperPlane />
        </div>

        <FaRegBookmark />
      </div>

      <div className="post__info">
        <p className="likes">{post.likes} </p>

        <p>
          <strong>{post.username}</strong> {post.caption}
        </p>
      </div>
    </div>
  );
}

export default Post;
