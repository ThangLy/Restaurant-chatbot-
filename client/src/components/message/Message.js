import React from 'react';

import './Message.css';

const Message = (props) => {
    let isSentByCurrentUser = false;

    if (props.speaks === 'bot') {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyStart">
                    <p className="sentText pr-10"></p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite" >{props.text}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justifyEnd">
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark ">{props.text}</p>
                    </div>
                    <p className="sentText pl-10 "></p>
                </div>
            )
    );
}

export default Message;