import { Table } from 'antd';

export const PostsTable = ({ posts, loading, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Table dataSource={posts} columns={columns} rowKey="id" />;
};