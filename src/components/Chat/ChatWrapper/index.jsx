import React from 'react';
import "./style.css";

//Components
import ContactsBlock from "../Left/ContactsBlock/index.jsx";
import ChatBlock from "../Right/ChatBlock/index.jsx";

const Chat = () => {

  return (
      <div className="app__container">
        <div className="app__container_left">
          <ContactsBlock />
        </div>

        <div className="app__container_right">
          <ChatBlock />
        </div>
      </div>
  );
};

export default Chat;