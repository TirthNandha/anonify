import React, { useState, useEffect } from 'react';
import "../styles/Post.css";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import axios from 'axios';

const Post = ({ college, department, passoutYear, title, content, commentsCount, username, postId, initialLikes, currentUser }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  useEffect(() => {
    // Check if the user has already liked the post
    async function fetchLikeStatus() {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${postId}/like-status`, { params: { username: currentUser } });
        if (response.data.isLiked) {
          setIsLiked(true);
        }
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    }
    fetchLikeStatus();
  }, [postId, currentUser]);

  async function handleLike() {
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${postId}/like`, { username: currentUser });
      if (response.data.success) {
        setIsLiked(response.data.isLiked);
        setLikes(response.data.likeCount);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  }

  return (
    <div className="postContainer">
      <div className="department">{department}</div>
      <div className='titleContainer'>
        <h2 className="title">{title}</h2>
        <span className="postedBy">{`~ Posted by ${username}`}</span>
      </div>
      <div className="tagContainer">
        <span className="tag">{college}</span>
        <span className="tag">{`Passout: ${passoutYear}`}</span>
      </div>
      <div className="divider"></div>
      <div className="content">{content}</div>
      <div className="footer">
        <span className="likes" onClick={handleLike} style={{ cursor: 'pointer' }}>
          <ThumbUpIcon style={{ color: isLiked ? 'blue' : 'inherit' }} /> {likes} Likes
        </span>
        <span className="comments"><CommentIcon /> {commentsCount} Comments</span>
      </div>
    </div>
  );
};

export default Post;
