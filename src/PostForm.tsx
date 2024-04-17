import React, { useState } from 'react';



interface PostFormProps {
    onSubmit: (newPost: { title: string, body: string }) => void; // Function to handle form submission
}

// Functional component for posting a new blog post
const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
    // State variables to store title and body of the new post
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Call the onSubmit function passed from the parent component with the new post data
        onSubmit({ title, body });
        // Clear the input fields after submission
        setTitle('');
        setBody('');
    };

    return (
        <form onSubmit={handleSubmit} className="post-form-container">
            {/* Input field for entering the post title */}
            <input
                type="text"
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="post-form-input"
                required // Title is required
            />
            {/* Textarea for entering the post body */}
            <textarea 
            placeholder='Body' 
            value={body} 
            onChange={(e) => setBody(e.target.value)} 
            className="post-form-input"
            required // Body is required
            />
{/* Button to submit the form */}
            <button type='submit' className="post-form-button">Submit</button>
        </form>
    );
};

export default PostForm;