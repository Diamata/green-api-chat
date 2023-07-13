import React, {useContext} from 'react';
import "./style.css";
import {ContactContext} from "../../../../context/ContactContext";

//Components
import IconButton from "../../../Common/IconButton";

//React Icons
import {MdSearch} from "react-icons/md";
import {BsThreeDotsVertical} from "react-icons/bs";

//Assets
import defaultPic from "../../../../assets/images/avatars/default-avatar.png";

const ChatTopMenu = () => {

  const { currentContact } = useContext(ContactContext);

  return (
    <>
      { currentContact !== null && (
          <div className="chat__menu">
            <div className="chat__contact-info">
              <div className="chat__contact-pic">
                <img src={currentContact?.avatar ? currentContact?.avatar : defaultPic} alt="Contact's picture"/>
              </div>
              <div className="chat__contact-data">
                <p className="chat__name">{currentContact?.name ? currentContact?.name : parseInt(currentContact?.chatId).toString()}</p>
                <p className="chat__status">last seen recently</p>
              </div>
            </div>

            <div className="chat__menu-buttons">
              <IconButton icon={<MdSearch />} />
              <IconButton icon={<BsThreeDotsVertical />} />
            </div>
          </div>
      )}
    </>
  );
};

export default ChatTopMenu;
