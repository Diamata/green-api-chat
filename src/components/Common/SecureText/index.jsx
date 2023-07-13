import React from 'react';
import "./style.css";
import {FaLock} from "react-icons/fa";

const SecureText = () => {
  return (
      <div className="securetext">
            <span className="securetext__lock-icon">
              <FaLock/>
            </span>
        <p>End-to-end encrypted</p>
      </div>
  );
};

export default SecureText;