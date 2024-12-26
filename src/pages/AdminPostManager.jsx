import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

const AdminPostManager = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts')
      .then((res) => setPosts(res.data))
      .catch(console.error);
  }, []);

  const handleFeedback = (postId, feedback) => {
    axios.post(`/admin/feedback/${postId}`, { feedback })
      .then(() => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, isBlurred: true, feedback } : post
          )
        );
      })
      .catch(console.error);
  };

  const handleApprove = (postId) => {
    axios.patch(`/admin/approve/${postId}`)
      .then(() => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, isBlurred: false, feedback: null } : post
          )
        );
      })
      .catch(console.error);
  };

  return (
    <Layout>
      <h1>Manage Posts</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>{post.isBlurred ? 'Blurred' : 'Visible'}</td>
              <td>
                {post.isBlurred ? (
                  <button onClick={() => handleApprove(post._id)}>Approve</button>
                ) : (
                  <button onClick={() => handleFeedback(post._id, 'Invalid content')}>
                    Feedback
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default AdminPostManager;
