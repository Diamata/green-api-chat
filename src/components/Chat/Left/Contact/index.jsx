import React from 'react';
import "./style.css";

//React Icons
import {MdDoneAll} from "react-icons/md";

//Assets
import defaultPic from "../../../../assets/images/avatars/default-avatar.png";

const Contact = ({chatId, name, avatar, time,
                   active, type, lastMsg, clicked}) => {

  return (

      <div className={active} onClick={clicked}>

        <div className="contact__img">
          <img src={avatar ? avatar : defaultPic} alt="User's avatar"/>
        </div>

        <p className="contact__name">{name ? name : parseInt(chatId).toString()}</p>
        <p className="contact__date">{time ? time : 'recently'}</p>

        <div className="contact__msg">
          {type === "outgoing" && (
            <div className="contacts__check_wrapper">
              <MdDoneAll className="contacts__check read" />
            </div>
          )}
          <p className="contact__last-message">{lastMsg ? lastMsg : ''}</p>
        </div>
      </div>
  );
};

export default Contact;