import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DataContext } from '../DataContext';
import { useParams } from 'react-router-dom';
import Post from './Post';
import { Box, Typography, Divider, TextareaAutosize, Button } from '@mui/material';
import Comment from './Comment';
import { useAuth } from '../AuthContext';

function DisplayPost() {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { postId } = useParams();
    const { department, passoutYear, username, college } = useContext(DataContext);
    const {isLoggedIn} = useAuth();

    useEffect(() => {
        const fetchPostAndComments = async (e) => {
            try {
                const [postResponse, commentsResponse] = await Promise.all([
                    axios.get(`http://localhost:5000/api/post/${postId}`),
                    axios.get(`http://localhost:5000/api/post/${postId}/comments`)
                ]);
                setPost(postResponse.data);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error("Error fetching post and comments:", error);
            }
        };

        fetchPostAndComments();
    }, [postId]);

    const handleCommentSubmit = async (e) => {
        try {
                if(isLoggedIn){

                    if (!newComment.trim()) {
                        // e.preventDefault();
                        alert("Comment cannot be empty");
                        return;
                    }
                    const response = await axios.post(`http://localhost:5000/api/post/${postId}/add-comment`, {
                        content: newComment,
                        username: username,
                        passoutYear: passoutYear,
                        department: department,
                        college: college
                    });
                    setComments([...comments, response.data]);
                    setNewComment('');
                    // alert("Comment added successfully");
                } else {
                    alert("You need to be logged in to comment on a post");
                }
            } catch (error) {
                console.error("Error adding comment:", error);
            }
    };

    if (!post) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><Typography>Loading...</Typography></Box>;

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', p: 2 }}>
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
            <Divider sx={{ my: 4 }} />
            <Typography variant="h5" sx={{ mb: 2 }}>Comments</Typography>

            <Box component="form" onSubmit={handleCommentSubmit} sx={{ mb: 4 }}>
                <TextareaAutosize
                    minRows={3}
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{ width: '100%', marginBottom: '16px', padding: '10px', fontSize: '16px' }}
                />
                <Button type="submit" variant="contained" sx={{ color: 'black', backgroundColor: 'white' }}>
                    Post Comment
                </Button>
            </Box>


            <Box sx={{ mt: 4, mb: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Comments</Typography>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <Comment key={comment._id} comment={comment} />
                    ))
                ) : (
                    <Typography variant="body2" color="text.secondary">No comments yet.</Typography>
                )}
            </Box>

        </Box>
    );
}

export default DisplayPost;