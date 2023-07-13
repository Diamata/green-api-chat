import {createContext, useState} from "react";
import {getContacts, getToken} from "../utils/localStorage";

export const ContactContext = createContext(false);

export const ContactProvider = ({ children }) => {

  const [userState, setUserState] = useState(getToken() || false); // User's state
  const [chosenChat, setChosenChat] = useState(null); // Current contact's chatId
  const [contactsState, setContactsState] = useState({}); // All contacts object's state (+ refreshing the preview of the last message)

  const currentContact = Object.values(getContacts()).find(chat => chat.chatId === chosenChat); // Current contact we're interacting with atm

  return (
      <ContactContext.Provider value={{
        userState, setUserState,
        chosenChat, setChosenChat,
        currentContact,
        contactsState, setContactsState
      }}>
        {children}
      </ContactContext.Provider>
  );
};