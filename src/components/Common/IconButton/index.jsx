import React from 'react';
import "./style.css";

const IconButton = ({ icon, onClick }) => {
  return (
      <button onClick={onClick}>
        {icon}
      </button>
  );
};

export default IconButton;