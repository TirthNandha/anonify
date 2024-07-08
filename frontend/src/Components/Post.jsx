import React from 'react';
import "../styles/Post.css";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

const Post = ({ college, department, passoutYear, title, content, likes, commentsCount, username }) => {
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
        <span className="likes"><ThumbUpIcon />{likes} Likes </span>
        <span className="comments"><CommentIcon /> {commentsCount} Comments</span>
      </div>
    </div>
  
  );
};

export default Post;