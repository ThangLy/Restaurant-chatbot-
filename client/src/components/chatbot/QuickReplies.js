import React, { Component } from 'react';
import QuickReply from './QuickReply';

class QuickReplies extends Component {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(event, text) {
        this.props.replyClick(event, text);
    }

    renderQuickReply(reply, i) {
        return <QuickReply key={i} click={this._handleClick} reply={reply} />;
    }

    renderQuickReplies(quickReplies) {
        if (quickReplies) {
            return quickReplies.map((reply, i) => {
                return this.renderQuickReply(reply, i);
            }
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <div
                className="p-3 pt-0"
                style={{
                    borderRadius: '15px',
                }}
            >
                <div className="option-content">
                    <div >
                        {this.props.text && <p>
                            {this.props.text.stringValue}
                        </p>
                        }
                        {this.renderQuickReplies(this.props.content)}

                    </div>
                </div>
            </div>
        );
    }
}


export default QuickReplies;