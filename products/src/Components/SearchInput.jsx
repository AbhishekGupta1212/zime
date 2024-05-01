import React from 'react';
import { Input} from 'antd';

const SearchInput = ({ search, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <Input.Search
      placeholder="Search posts"
      value={search}
      onChange={handleChange}
      style={{ width: '100%', marginBottom: '1rem' }}
    />
  );
};

export default SearchInput;