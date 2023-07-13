import React from 'react';
import "./style.css";
import home from "../../assets/images/bgs/home-screen.png";
import SecureText from "../Common/SecureText/index.jsx";

const WhatsAppHome = () => {
  return (
      <div className="homepage">

        <div className="homepage__picture">
          <img src={home} alt="Home screen picture of a handy and a laptop"/>
        </div>

        <div className="homepage__texts">
          <h1>WhatsApp Web</h1>
          <p>Make calls and send messages without connecting your phone.</p>
          <p>Use WhatsApp on up to 4 devices at the same time.</p>
        </div>

        <div className="homepage__bottom">
          <SecureText/>
          <span className="homepage__line"/>
        </div>
      </div>
  );
};

export default WhatsAppHome;