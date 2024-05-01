import React from 'react';
import { Select } from 'antd';

const { Option } = Select;
const tags = [
  { value: 'history', label: 'History' },
  { value: 'american', label: 'American' },
  { value: 'crime', label: 'Crime' },
  { value: 'french', label: 'French' },
  { value: 'fiction', label: 'Fiction' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'love', label: 'Love' },
  { value: 'classic', label: 'Classic' },
  { value: 'magical', label: 'Magical' },
];
const TagsFilter = ({ tag, onChange }) => {
    console.log(tags)
  const handleChange = (selectedTags) => {
    onChange(selectedTags);
  };

  return (
    <Select
      mode="multiple"
      placeholder="Select tags"
      value={tag}
      onChange={handleChange}
      style={{ width: '100%', marginBottom: '1rem' }}
    >
{tags.map((el)=>
   <Option key={el.value} value={el.value}>{el.label}</Option>
)}
    </Select>
  );
};

export default TagsFilter;