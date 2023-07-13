import React from 'react';
import "./style.css";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const Emojies = ({props:{inputRef, setTyping}}) => {

  const handleSelect = (e) => {
    const sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    inputRef.current.value = inputRef.current.value + emoji;
    inputRef.current.focus();
    setTyping(true);
  }

  return (
      <div className="emojies">
        <Picker
            data={data}
            onEmojiSelect={handleSelect}
        />
      </div>
  );
};

export default Emojies;