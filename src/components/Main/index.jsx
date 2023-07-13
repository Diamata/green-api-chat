import React, {useContext, useEffect} from 'react';
import './style.css';
import {ContactContext} from "../../context/ContactContext.js";
import { useNavigate, Outlet } from "react-router-dom";

const Main = () => {

  const { userState } = useContext(ContactContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState) {
      return navigate("/login")
    }

    if (userState) {
      return navigate("/user")
    }
  }, [userState])

  return (
    <div id="app">
      <Outlet/>
    </div>
  );
};

export default Main;