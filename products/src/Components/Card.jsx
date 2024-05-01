import { useEffect, useState } from 'react';

export const Card = (page, limit, tags, search) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/posts?skip=${page * limit}&limit=${limit}${
            tags.length > 0 ? `&tags=${tags.join(',')}` : ''
          }${search ? `&search=${search}` : ''}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data.posts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit, tags, search]);

  return { posts, loading, error };
};
