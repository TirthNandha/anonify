import Post from './Post';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RenderPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts from the database
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            // Make an API call to fetch posts from the database
            const response = await axios.get("http://localhost:5000/api/posts");
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
                        key={post.id}
                        college={post.college}
                        department={post.department}
                        passoutYear={post.passoutYear}
                        title={post.title}
                        content={post.content}
                        likes={post.likes}
                        commentsCount={post.commentsCount}
                        username={post.username}
                    />
                ))
            )}
        </div>
    );
}

export default RenderPost;