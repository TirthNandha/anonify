import React, { useState, useEffect } from 'react';
import "../styles/Post.css";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const API_URL = process.env.REACT_APP_API_URL;

const Post = ({ college, department, passoutYear, title, content, commentsCount, username, postId, initialLikes, currentUser }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const {isLoggedIn} = useAuth();

  useEffect(() => {
    // Check if the user has already liked the post
    async function fetchLikeStatus() {
      try {
        const response = await axios.get(`${API_URL}/api/posts/${postId}/like-status`, { params: { username: currentUser } });
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
      if(isLoggedIn){
        const response = await axios.post(`${API_URL}/api/posts/${postId}/like`, { username: currentUser });
        if (response.data.success) {
          setIsLiked(response.data.isLiked);
          setLikes(response.data.likeCount);
        }
      } else{
        alert("You need to be logged in to like a post");
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  }

  function handlePost() {
    window.location.href = `/post/${postId}`;
  }

  return (
    <div className="postContainer">
      <div className="department">{department}</div>
      <div className='titleContainer'>
          <h2 className="title" style={{ cursor: 'pointer' }} onClick={handlePost}>{title}</h2>
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
        <span className="comments" onClick={handlePost} style={{ cursor: 'pointer' }}><CommentIcon /> {commentsCount} Comments</span>
      </div>
    </div>
  );
};

export default Post;
