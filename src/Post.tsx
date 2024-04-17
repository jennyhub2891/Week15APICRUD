import React, { useState } from 'react';


interface PostProps {
    post: {
        id: number;
        title: string;
        body: string;
    };
    onEdit: (id: number, updatedPost: { title: string, body: string }) => void; // Function to handle post edit
    onDelete: (id: number) => void; // Function to handle post deletion
}

// Functional component to display a single post
const Post: React.FC<PostProps> = ({ post, onEdit, onDelete }) => {
    // State variables to track edit mode and edited title/body
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(post.title);
    const [editedBody, setEditedBody] = useState(post.body);

    // Function to handle entering edit mode
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Function to handle saving changes
    const handleSave = () => {
        // Call the onEdit function passed from the parent component with the post ID and the updated title/body
        onEdit(post.id, { title: editedTitle, body: editedBody });
        // Exit edit mode
        setIsEditing(false);
    };
    // Function to handle deleting the post
    const handleDelete = () => {
        // Call the onDelete function passed from the parent component with the post ID
        onDelete(post.id);
    };

    return (
        <div>
            {/* Render input fields for editing if in edit mode, otherwise render post details */}
            {isEditing ? (
                <div>
                    <input 
                    type="text" 
                    value={editedTitle} 
                    onChange={e => setEditedTitle(e.target.value)} 
                    className='post-input'
                    />
                    <textarea 
                    value={editedBody} 
                    onChange={e => setEditedBody(e.target.value)} 
                    className="post-input"
                    />
                    <button onClick={handleSave} className="post-button">Save</button>
                </div>
            ) : (
                <div>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-body">{post.body}</p>
                    <button onClick={handleEdit} className="post-edit-button">Edit</button>
                    <button onClick={handleDelete} className="post-delete-button">Delete</button>
                </div>
            )}


        </div>
    );
};

export default Post;
