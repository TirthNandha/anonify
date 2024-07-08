import Post from './Post';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {DataContext} from '../DataContext';

function RenderPost() {
    const [posts, setPosts] = useState([]);
    const {username} = useContext(DataContext)

    useEffect(() => {
        // Fetch posts from the database
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            // Make an API call to fetch posts from the database
            const response = await axios.get("http://localhost:5000/api/posts");
            console.log("response.data to render: ", response.data);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    return (
        <div>
            {posts.length === 0 ? (
                <p>No posts to display</p>
            ) : (
                posts.map((post) => (
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
                ))
            )}
        </div>
    );
}

export default RenderPost;