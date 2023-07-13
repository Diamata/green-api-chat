import React from 'react';
import './style.css';
import {Link} from "react-router-dom";

const ErrorPage = () => {
  return (
      <div className="error">
        <h2>Oops! Something went wrong!</h2>
        <p>If you want to use the chat, please, <Link to="login">log in</Link>!</p>
      </div>
  );
};

export default ErrorPage;