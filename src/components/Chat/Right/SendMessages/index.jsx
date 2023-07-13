import React, {useContext, useEffect, useRef, useState} from 'react';
import "./style.css";

//Components
import IconButton from "../../../Common/IconButton";
import Emojies from "../../../Common/Emojies";

//React Icons
import {VscSmiley} from "react-icons/vsc";
import {AiOutlinePaperClip} from "react-icons/ai";
import {MdOutlineMic, MdSend} from "react-icons/md";

//Utils
import {sendMessage} from "../../../../api";
import {getIdInstance, getToken} from "../../../../utils/localStorage";
import {ContactContext} from "../../../../context/ContactContext";

const SendMessage = () => {

  const { chosenChat } = useContext(ContactContext);

  const [typing, setTyping] = useState(false);
  const [emojies, setEmojies] = useState(false);

  const inputRef = useRef(null);

  const handleInputChange = () => {
    inputRef.current.value.length === 0 ? setTyping(false) : setTyping(true);
  }

  const handleInputSubmit = () => {
    (async function() {
      if (inputRef.current.value.length > 0) {

        // Sending a new message to the server
        await sendMessage(getIdInstance(), getToken(), chosenChat, inputRef.current.value);

        inputRef.current.value = '';
        inputRef.current.focus();
        setTyping(false);
        setEmojies(false);
      }
    }())
  }

  // Send message with Enter pressed
  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter") handleInputSubmit();
    }
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  });

  // Emojies invoke
  const handleEmojiClick = () => {
    setEmojies(!emojies)
  }

  return (
      <div className="chat__bottom">

        <IconButton icon={<VscSmiley />} onClick={handleEmojiClick}/>

        {emojies && <Emojies props={{inputRef, setTyping}}/>}

        <span className="chat__clip-icon"><IconButton icon={<AiOutlinePaperClip />} /></span>

        <input
            placeholder="Type a message"
            className="chat__msg-input"
            maxLength={10000}
            ref={inputRef}
            onChange={handleInputChange}
        />

        {
          typing
            ?
            <IconButton icon={<MdSend />} onClick={handleInputSubmit}/>
            :
            <IconButton icon={<MdOutlineMic />} />
        }
      </div>
  );
};

export default SendMessage;