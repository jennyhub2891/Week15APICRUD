import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import PostList from './PostList'; // Import PostList component
import PostForm from './PostForm'; // Import PostForm component
import './App.css';


interface Post {
  id: number;
  title: string;
  body: string;
}



const App: React.FC = () => {
  // Define state to hold posts
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts from the API when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts from the API
  const fetchPosts = () => {
    axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=3')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  };

  // Function to add a new post
  const addPost = (newPost: { title: string, body: string }) => {
    axios.post<Post>('https://jsonplaceholder.typicode.com/posts', newPost)
      .then(response => {
        setPosts([...posts, response.data]);
      })
      .catch(error => {
        console.error('Error adding post:', error);
      });
  };

  // Function to edit existing post
  const editPost = (id: number, updatedPost: { title: string, body: string }) => {
    axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedPost)
      .then(() => {
        setPosts(posts.map(post => (post.id === id ? { ...post, ...updatedPost } : post)));
      })
      .catch(error => {
        console.error('Error updating post:', error);
      });
  };

  // Function to delete a post
  const deletePost = (id: number) => {
    axios.delete('https://jsonplaceholder.typicode.com/posts/${id}')
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div className="app-container">
      <h1>CRUD APP USING JSON PLACEHOLDER API</h1>
      <PostForm onSubmit={addPost} />
      <PostList posts={posts} onEdit={editPost} onDelete={deletePost} />
    </div>
  );

};



export default App
