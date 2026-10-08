import React from 'react';

const SearchBox = ({ searchChange }) => {
  return (
    <div className="search-container tc">
      <input
        className="search-input"
        type="search"
        placeholder="Search for a friend..."
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;
