import React, {useContext, useEffect, useRef, useState} from 'react';
import "./style.css";
import {ContactContext} from "../../../../context/ContactContext";

//Components
import MessageBubble from "../MessageBubble/";
import ScrollToBottom from "../../../Common/ScrollToBottom";

//Utils
import {deleteNotification, getMessage, receiveNotification, sendMessage} from "../../../../api";
import {getContacts, getIdInstance, getToken, setContacts} from "../../../../utils/localStorage";

const ChatMessageField = () => {

  const {currentContact, chosenChat,
    contactsState, setContactsState } = useContext(ContactContext);

  const [chatHistory, setChatHistory] = useState(currentContact.chatHistory);

  useEffect(() => {
    setChatHistory(currentContact.chatHistory)
  }, [chosenChat]);

  // Auto scroll to new messages
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory]);

  // Scroll to bottom button
  const divRef = useRef(0);

  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    divRef.current.scrollTo({
      top: divRef.current.scrollHeight,
      behavior: 'smooth'
    });
  };

  // Receiving notifications
  useEffect(() => {
    let timeout = setInterval(async () => {

      // getting a notification
      const notificationData = await receiveNotification(getIdInstance(), getToken());

      if (notificationData?.body?.senderData?.chatId === chosenChat) {

        const newMessage = await getMessage(getIdInstance(), getToken(), chosenChat, notificationData?.body?.idMessage);

        setChatHistory({...chatHistory, [newMessage.idMessage]: newMessage});

        // Saving new messages to the storage and contacts object
        const newCurrentContact = {...currentContact, chatHistory: chatHistory};
        const renewedContacts = {...contactsState, [chosenChat]: newCurrentContact};
        setContactsState(renewedContacts);
        setContacts(renewedContacts);
      }

      if (notificationData?.receiptId) {
        await deleteNotification(getIdInstance(), getToken(), notificationData?.receiptId)
      }
    }, 5000);

    return () => clearInterval(timeout);

  }, [getContacts()]);

  const listenToScroll = () => {
    if (divRef.current.scrollHeight - divRef.current.scrollTop > 1000) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    divRef.current.addEventListener("scroll", listenToScroll);
    return () => divRef.current?.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
      <div className="chat__space" ref={divRef}>
        {Object.values(chatHistory)?.map(msg => (
            <MessageBubble
                key={msg.idMessage}
                textMessage={msg.textMessage}
                typeMessage={msg.type}
                time={msg.timestamp}
            />
        ))}

        {/* Scroll to bottom button */}

        <ScrollToBottom
            handleClick={handleClick}
            active={visible}
        />

        {/* Auto scroll to new messages */}

        <div style={{marginBottom: "1px"}} ref={messagesEndRef}/>
      </div>
  );
};

export default ChatMessageField;