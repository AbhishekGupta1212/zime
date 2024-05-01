import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Select,Tag} from 'antd';
import SearchInput from './Components/SearchInput';
import TagsFilter from './Components/TagFilter';

const { Option } = Select;


const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Body',
    dataIndex: 'body',
    key: 'body',
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    render: (tags) => (
      <>
      {tags.map(tag => (
        <Tag color="blue" key={tag}>
          {tag }
        </Tag>
      ))}
      </>
      
    ),
  },
];

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://dummyjson.com/posts?skip=${(page - 1) * limit}&limit=${limit}${
          tags.length > 0 ? `&tags=${tags.join(',')}` : ''
        }${search ? `&search=${search}` : ''}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      setPosts(data.posts);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageParam = queryParams.get('page');
    const limitParam = queryParams.get('limit');
    const tagsParam = queryParams.get('tags');
    const searchParam = queryParams.get('search');

    if (pageParam) {
      setPage(parseInt(pageParam, 10));
    }

    if (limitParam) {
      setLimit(parseInt(limitParam, 10));
    }

    if (tagsParam) {
      setTags(tagsParam.split(','));
    }

    if (searchParam) {
      setSearch(searchParam);
    }

    fetchData();
  }, [location.search]);

  const handlePageChange = (page) => {
    setPage(page);
    navigate(`/posts?page=${page}&limit=${limit}${tags.length > 0 ? `&tags=${tags.join(',')}` : ''}${search ? `&search=${search}` : ''}`);
  };

  const handleLimitChange = (limit) => {
    setLimit(limit);
    navigate(`/posts?page=${page}&limit=${limit}${tags.length > 0 ? `&tags=${tags.join(',')}` : ''}${search ? `&search=${search}` : ''}`);
  };

  const handleTagsChange = (tags) => {
    setTags(tags);
    navigate(`/posts?page=${page}&limit=${limit}${tags.length > 0 ? `&tags=${tags.join(',')}` : ''}${search ? `&search=${search}` : ''}`);
  };

  const handleSearchChange = (search) => {
    setSearch(search);
    navigate(`/posts?page=${page}&limit=${limit}${tags.length > 0 ? `&tags=${tags.join(',')}` : ''}${search ? `&search=${search}` : ''}`);
  };

  return (
    <div>
      <h1>Posts</h1>
      <SearchInput search={search} onChange={handleSearchChange} />
      <TagsFilter tags={tags} onChange={handleTagsChange} />
      <Table
        columns={columns}
        dataSource={posts}
        loading={loading}
        pagination={{
          current: page,
          pageSize: limit,
          total: 100,
          onChange: handlePageChange,
        }}
      />
      <div>
        <label>
          Limit:
          <Select value={limit} onChange={handleLimitChange}>
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={30}>30</Option>
          </Select>
        </label>
      </div>
    </div>
  );
};

export default App;


