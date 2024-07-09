import Post from './Post';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DataContext } from '../DataContext';
import { useParams } from 'react-router-dom';

function DisplayPost() {
    const [post, setPost] = useState(null);
    const { postId } = useParams();
    const {username} = useContext(DataContext);
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/post/${postId}`);
                console.log("data for the post: ", response.data);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };
    
        fetchPost();
    }, [postId]);
    if (!post) return <div>Loading...</div>;

    return (
        <Post
            key={post._id}
            college={post.college}
            department={post.department}
            passoutYear={post.passoutYear}
            title={post.title}
            content={post.content}
            commentsCount={post.commentsCount}
            username={post.username}
            postId={post._id}
            initialLikes={post.likes}
            currentUser={username}
        />
    )
}

export default DisplayPost;