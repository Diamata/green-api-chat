import React from 'react';

// Components
import ChatTopMenu from "../ChatTopMenu";
import ChatMessageField from "../ChatMessageField";
import SendMessage from "../SendMessages";

const ChatRight = () => {

  return (
      <>
        <ChatTopMenu />
        <ChatMessageField />
        <SendMessage />
      </>
  );
};

export default ChatRight;