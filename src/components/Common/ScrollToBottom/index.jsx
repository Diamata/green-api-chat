import React from 'react';
import "./style.css";
import {MdKeyboardArrowDown} from "react-icons/md";

const ScrollToBottom = ({ handleClick, active }) => {

  return (
    <div className={active ? "scroll active" : "scroll"} onClick={handleClick} role="button">
      <MdKeyboardArrowDown />
    </div>
  );
};

export default ScrollToBottom;