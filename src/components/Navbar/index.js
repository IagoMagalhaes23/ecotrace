import React, { useState } from 'react';
import './styles.css'; // Import your CSS file if you have one
import Input from '../Input';

const Navbar = () => {

    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
    };
  
    const handleSearch = () => {
      // Perform search logic here
      console.log('Search triggered with value:', searchValue);
    };

  return (
      <div className="topbar">
        <div className="topbar-item">Logo</div>
        <div className="topbar-item">Nome do usuario</div>
      </div>
  );
};

export default Navbar;