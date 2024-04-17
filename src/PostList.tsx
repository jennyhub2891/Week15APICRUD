import React from 'react';
import Post from './Post'; // Import Post component


interface PostListProps {
    posts: Post[]; // Array of posts to display
    onEdit: (id: number, updatedPost: { title: string, body: string }) => void; // Function to handle post edit
    onDelete: (id: number) => void; // Function to handle post deletion
}

// Functional component to display a list of posts
const PostList: React.FC<PostListProps> = ({ posts, onEdit, onDelete }) => {
    return (
        <div>
            <h2>Posts</h2>
            {/* Iterate over the posts array and render each post using the Post component */}
            {posts.map(post => (
                <Post key={post.id} post={post} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
};


export default PostList;