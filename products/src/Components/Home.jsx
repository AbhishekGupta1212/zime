import React, { useState, useEffect } from "react";
import { Table, Input, Select, Pagination,Tag, Flex } from "antd";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const { Search } = Input;
const { Option } = Select;

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    fetchData();
  }, [location]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [searchQuery, pagination.current, pagination.pageSize]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://dummyjson.com/posts/search?q=${searchQuery}&skip=${
          (pagination.current - 1) * pagination.pageSize
        }&limit=${pagination.pageSize}`
      );
      const { posts, total } = response.data;
      setPosts(posts);
      setPagination((prevPagination) => ({
        ...prevPagination,
        total,
      }));
      const tags = posts.reduce((acc, post) => {
        post.tags.forEach((tag) => {
          if (!acc.includes(tag)) {
            acc.push(tag);
          }
        });
        return acc;
      }, []);
      setAllTags(tags);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handlePaginationChange = (page, pageSize) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: page,
      pageSize,
    }));
    navigate(`?page=${page}`);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: 1, 
    }));
    navigate(`?page=1&search=${value}`);
  };

  const handleTagChange = (value) => {
    setSelectedTags(value);
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: 1, 
    }));
    navigate(`?page=1&tags=${value.join(",")}`);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
   
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
 
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <>
        {tags.map(tag => (
            <Flex justify="space-evenly" gap="small" align="start" vertical p='10px' >
                  <Tag color="blue" key={tag.id} >
              {tag}
            </Tag>
            </Flex>
          
          ))}
        </>
        
      ),
    },
  ];

  const filteredPosts = selectedTags.length
    ? posts.filter((post) =>
        selectedTags.every((tag) => post.tags.includes(tag))
      )
    : posts;

  return (
    <>
      <section >
        <div style={{textAlign:"center"}}>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        
          >
            Zime Posts
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
        
          >
            <Flex gap={40} alignItems="center" >
            <Search
              placeholder="Search posts"
              onSearch={handleSearch}
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              style={{minWidth: 200}}
           
            />
            <Select
              mode="multiple"
              style={{ minWidth: 200 ,alignItems:"center"}}
              placeholder="Select tags"
              onChange={handleTagChange}
              defaultValue={selectedTags}
          
            >
              {allTags.map((tag) => (
                <Option key={tag} value={tag}>
                  {tag}
                </Option>
              ))}
            </Select>
            </Flex>
           
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Table
              dataSource={filteredPosts}
              columns={columns}
              loading={loading}
              pagination={false}
              bordered
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
      
          >
            <Pagination
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={handlePaginationChange}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;