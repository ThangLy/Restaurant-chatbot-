import React from 'react';

const QuickReply = (props) => {

    return (
        <a className="option-item" href="/"
            onClick={(event) =>
                props.click(
                    event,
                    props.reply.structValue.fields.text.stringValue
                )
            }>
            {props.reply.structValue.fields.text.stringValue}
        </a>
    );

};

export default QuickReply;