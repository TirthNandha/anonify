import * as React from 'react';
import '@fontsource/inter';
import Header from "./Header";
import PostLayout from './PostLayout';

function PostPage() {
    return (
        <div>
            <Header />
            <PostLayout />
        </div>
    )
}

export default PostPage;