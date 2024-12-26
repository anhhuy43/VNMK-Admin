import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/admin/get-list-posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data.data);
      console.log("🚀 ~ fetchPosts ~ response.data.data:", response.data.data)

    };

    fetchPosts();
  }, []);

  const handleHide = async (postId) => {
    const token = localStorage.getItem('token');
    await axios.post(`http://localhost:5000/api/admin/posts/${postId}/hide`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Post hidden!');
  };

  const handleFeedback = async (postId) => {
    const feedback = prompt('Enter your feedback:');
    const token = localStorage.getItem('token');
    await axios.post(`http://localhost:5000/api/admin/posts/${postId}/feedback`, { feedback }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Feedback sent!');
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id} style={{ listStyle: "none"}}>
            <h1>{post.userId.firstName}{post.userId.lastName}</h1>
            <span>{post.userId.email}</span>
            <h2>{post.name}</h2>
            <p>{post.description}</p>
            <p>{post.createAtFormatted}</p>
            <button onClick={() => handleHide(post.id)}>Hide</button>
            <button onClick={() => handleFeedback(post.id)}>Feedback</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
