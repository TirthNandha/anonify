import React from 'react';
import "../styles/Post.css";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

const Post = ({ college, department, passoutYear, title, content, likes, comments }) => {
  return (
    <div className="postContainer">
      {/* <div className="header">
        <div className="department">{department}</div>
        
      </div> */}
      <div className="department">{department}</div>
      <h2 className="title">{title}</h2>
      <div className="tagContainer">
          <span className="tag">{college}</span>
          <span className="tag">{`Passout: ${passoutYear}`}</span>
        </div>
      <div className="divider"></div>
      <div className="content">{content}</div>
      <div className="footer">
        <span className="likes"><ThumbUpIcon />{likes} Likes </span>
        <span className="comments"><CommentIcon /> {comments} Comments</span>
      </div>
    </div>
  );
};

export default Post;