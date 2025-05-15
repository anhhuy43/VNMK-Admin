import React, { useEffect, useState } from 'react';
import { Table, Select, Button, message } from 'antd';
import axios from 'axios';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [isBlurred, setIsBlurred] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/admin/get-list-posts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data.data);
        console.log(response.data.data);
      } catch {
        message.error('Không thể lấy danh sách bài viết');
      }
    };
    fetchPosts();
  }, []);

  const handleChangeStatus = (postId, value) => {
    setSelectedStatus((prevState) => ({
      ...prevState,
      [postId]: value,
    }));
  };

  const handleSubmit = async (postId) => {
    const reason = selectedStatus[postId];
    if (!reason) {
      message.warning('You need to select before submitting!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        '/api/admin/posts/status',
        { postId, status: 'blurred', reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, status: 'blurred', reason } : post
        )
      );
      setIsBlurred((prevState) => ({
        ...prevState,
        [postId]: true,
      }));
      message.success('Đã cập nhật trạng thái bài viết');
    } catch {
      message.error('Lỗi khi cập nhật trạng thái bài viết');
    }
  };

  const handleUnblur = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        '/api/admin/posts/status',
        { postId, status: 'active', reason: null },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, status: 'active', reason: null } : post
        )
      );
      setIsBlurred((prevState) => ({
        ...prevState,
        [postId]: false,
      }));
      message.success('Đã gỡ blur cho bài viết');
    } catch {
      message.error('Lỗi khi gỡ blur bài viết');
    }
  };

  const columns = [
    { title: 'Index', dataIndex: 'index', render: (_, __, index) => index + 1 },
    { title: 'Name', dataIndex: ['userId', 'name'], key: 'name' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Reason',
      render: (text, record) => (
        <Select
          value={selectedStatus[record._id] || undefined}
          placeholder="Select Reason"
          style={{ width: 200 }}
          onChange={(value) => handleChangeStatus(record._id, value)}
          disabled={isBlurred[record._id]}
        >
          <Select.Option value="Thiếu thông tin">Thiếu thông tin</Select.Option>
          <Select.Option value="Nghi vấn gian lận">Nghi vấn gian lận</Select.Option>
          <Select.Option value="Clone Account">Acc clone</Select.Option>
        </Select>
      ),
    },
    {
      title: 'Hành động',
      render: (text, record) => (
        <>
          <Button
            type="primary"
            onClick={() => handleSubmit(record._id)}
            disabled={isBlurred[record._id]}
          >
            Submit
          </Button>
          {isBlurred[record._id] && (
            <Button
              danger
              onClick={() => handleUnblur(record._id)}
              style={{ marginLeft: '10px' }}
            >
              Hủy Blur
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <Table
      dataSource={posts.map((post, index) => ({ ...post, key: index }))}
      columns={columns}
      rowClassName="editable-row"
    />
  );
};

export default Dashboard;
