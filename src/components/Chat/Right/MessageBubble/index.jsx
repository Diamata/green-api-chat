import React, {useState} from 'react';
import "./style.css";

//React Icons
import {MdDoneAll} from "react-icons/md";

//Utils
import Linkify from 'linkify-react';
import {getTime} from "../../../../functions/functions";

const MessageBubble = ({textMessage, typeMessage, time}) => {

  const [isShowMore, setIsShowMore] = useState("message__show-more");
  const [notExpanded, setNotExpanded] = useState(true);

  const showMore = () => {
    setIsShowMore("message__show-more disabled");
    setNotExpanded(false);
  }

  return (
      <div className="message">
        <div className={typeMessage === 'outgoing' ? "message sent" : "message received"}>
          <Linkify
              className="message_text"
              as="p"
              options={{
                target: '_blank',
                style: { color: '#177c8a' },
              }}
          >
            {textMessage?.length > 770 && notExpanded ? textMessage.substring(0,765) + '...' : textMessage}
            <span className={textMessage?.length > 770 && notExpanded ? isShowMore : "message__show-more disabled"} onClick={showMore}>Далее</span>
            <span className="message__gap"/>
          </Linkify>
          <div className="message__time">{getTime(time)}
            {typeMessage === 'outgoing' && (
                <span className="message__check read">
                  <MdDoneAll/>
                </span>
            )}
          </div>
        </div>
      </div>
  );
};

export default MessageBubble;