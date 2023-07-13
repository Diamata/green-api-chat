import React, {useContext, useEffect, useRef, useState} from 'react';
import './style.css';
import {ContactContext} from "../../../../context/ContactContext.js";

//Components
import IconButton from "../../../Common/IconButton/index.jsx";
import Contact from "../Contact/index.jsx";

//Utils
import {
  getContacts,
  getIdInstance,
  getToken, removeContact,
  removeUserSession,
  setContacts
} from "../../../../utils/localStorage.js";
import {getAllMessages, getCheckWhatsapp, getContactNumber} from "../../../../api";
import {getTime} from "../../../../functions/functions";
import {Link, useNavigate} from "react-router-dom";

//React Icons
import {MdGroups, MdSearch, MdDonutLarge, MdChat} from "react-icons/md";
import {BsThreeDotsVertical} from "react-icons/bs";
import {BiFilter} from "react-icons/bi";
import {FaSignOutAlt} from "react-icons/fa";

//Assets
import userPic from "../../../../assets/images/avatars/profile-pic.png";

const ContactsBlock = () => {

  const navigate = useNavigate();

  const { setUserState,
    chosenChat, setChosenChat,
    setContactsState } = useContext(ContactContext);

  const [enteredNumber, setEnteredNumber] = useState('');
  const [isPopUp, setIsPopUp] = useState(false);

  const inputRef = useRef(null);

  //Logout button: logs out and clears storage
  const handleLogout = () => {
    removeUserSession();
    setUserState(false);
    navigate("/login");
  }

  // Choosing a contact to chat with
  const handleClick = (currentChatId) => {
    if (currentChatId !== chosenChat) {
      setChosenChat(currentChatId);
    } else {
      setChosenChat(null);
    }
  }

  // Entering the phone number of the contact the user wants to chat with
  const handleNumberSubmit = () => {
    if (inputRef.current.value.length > 1) {
      (async function() {
          try {
            const contacts = getContacts();

            if (Object.keys(contacts).length > 0) {
              setIsPopUp(true);
              return inputRef.current.value;
            }

            // Checking the validity of the contact's number (receiving contact's info object)
            const number = await getContactNumber(getIdInstance(), getToken(), `${enteredNumber}@c.us`);

            // Checking if the contact has Whatsapp
            const exists = await getCheckWhatsapp(getIdInstance(), getToken(), enteredNumber);

            // Checking if the number is correct + the contact has Whatsapp + we haven't added this contact to the array yet
            if (number && exists.existsWhatsapp) {

              // Getting the array of chat history of this particular contact and writing it to the storage
              const messagesHistoryArray = await getAllMessages(getIdInstance(), getToken(), `${enteredNumber}@c.us`);

              // Converting array of messages to the object for preventing duplication of messages
              const messagesHistoryObject = messagesHistoryArray.reverse().reduce((obj, key) => {
                return {...obj, [key.idMessage]: key}
              }, {});

              // Adding the chat history to the current contact
              const currentNewContact = {...number, chatHistory: messagesHistoryObject};

              // Creating the contacts object list
              const renewedContacts = {...contacts, [`${enteredNumber}@c.us`]: currentNewContact};

              // Setting renewed contact to the contact object list in the storage
              setChosenChat(`${enteredNumber}@c.us`);
              navigate(`${enteredNumber}`);
              setContacts(renewedContacts);
              setContactsState(renewedContacts);
            } else {
              if (!number || !exists.existsWhatsapp) alert("Incorrect number or this contact doesn't use WhatsApp");
            }
          } catch (error) {
            console.log(error);
          }
          // Clearing the input after entering a number
          inputRef.current.value = '';
      })()
    }
  }

  // Enter the contact's number on Enter pressed, or the user can press the <MdSearch/> icon
  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter") handleNumberSubmit();
    }
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  });

  //PopUp functions
  const handleCancel = () => setIsPopUp(false);
  const handleProceed = () => {
    removeContact();
    setChosenChat(null);
    setContactsState({});
    setIsPopUp(false);
    handleNumberSubmit();
  }

  return (
      <div className="contacts-block">

        {/* Top menu block  */}

        <div className="contacts-block__menu">
          <div className="contacts-block__menu-user">
            <div className="contacts-block__user-pic">
              <img src={userPic} alt="User profile picture"/>
            </div>

            {/* Logout button */}

            <IconButton onClick={handleLogout} icon={<FaSignOutAlt/> } />
          </div>

          {/* Plugs for the buttons */}

          <div className="contacts-block__menu-buttons">
            <IconButton icon={<MdGroups />} />
            <IconButton icon={<MdDonutLarge />} />
            <IconButton icon={<MdChat />} />
            <IconButton icon={<BsThreeDotsVertical />} />
          </div>
        </div>

        {/*  Searchbar  */}

        <div className="contacts-block__search">

          <div className="contacts-block__search-field">
            <div className="contacts-block__search-icon" onClick={handleNumberSubmit}>
              <MdSearch/>
            </div>

            <input
                ref={inputRef}
                type="text"
                placeholder="Search or start new chat"
                className="contacts-block__search_input"
                name="chatId"
                tabIndex={0}
                onChange={e => setEnteredNumber(e.target.value)}
            />
          </div>

          {/* Plug for the filter button */}

          <div className="contacts-block__search_filter-button">
            <BiFilter/>
          </div>

          {/* Pop-up window to replace the current contact to a new one */}

          <div className={isPopUp ? "popup active" : "popup"}>
            <p className="popup__text">You are going to change the contact you are chatting with at the moment to another one. Are you sure you want to proceed?</p>
            <button className="popup__button" onClick={handleCancel}>Cancel</button>
            <button className="popup__button" onClick={handleProceed}>Proceed</button>
          </div>
        </div>


       {/*  List of the contacts  */}

        <div className="contacts-block__contact">
          {Object.values(getContacts())?.map(contact => (
              <Link key={contact.chatId} to={`${(parseInt(contact.chatId)).toString()}`}>
                <Contact
                    chatId={contact.chatId}
                    name={contact.name}
                    avatar={contact.avatar}
                    active={contact.chatId === chosenChat ? "contact active" : "contact"}
                    clicked={() => handleClick(contact.chatId)}
                    time={getTime(contact.chatHistory[Object.keys(contact.chatHistory)[Object.keys(contact.chatHistory).length - 1]]?.timestamp)}
                    lastMsg={contact.chatHistory[Object.keys(contact.chatHistory)[Object.keys(contact.chatHistory).length - 1]]?.textMessage}
                    statusMessage={contact.chatHistory[Object.keys(contact.chatHistory)[Object.keys(contact.chatHistory).length - 1]]?.statusMessage}
                    type={contact.chatHistory[Object.keys(contact.chatHistory)[Object.keys(contact.chatHistory).length - 1]]?.type}
                />
              </Link>
          ))}
        </div>
      </div>
  );
};

export default ContactsBlock;