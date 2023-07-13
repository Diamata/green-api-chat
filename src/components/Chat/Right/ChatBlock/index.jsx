import React, {useContext} from 'react';
import "./style.css"
import {ContactContext} from "../../../../context/ContactContext";

//Components
import WhatsAppHome from "../../../WhatsAppHome/index";
import ChatRight from "../ChatRight";

const ChatBlock = () => {

  const { chosenChat } = useContext(ContactContext);

    return (
      <div className="chat">
        {chosenChat === null
          ?
            <WhatsAppHome />
          :
            <ChatRight />
        }
      </div>
  );
};

export default ChatBlock;