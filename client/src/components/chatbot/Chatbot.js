import './Chatbot.css'
import React, { Component } from 'react';
import axios from "axios/index";

import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';

import Message from '../message/Message';
import Card from '../card/Card';

const cookies = new Cookies();

class Chatbot extends Component {

    messagesEnd;
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this.state = {
            messages: []
        };
        if (cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), { path: '/' });
        }
    }

    async df_text_query(queryText) {
        let says = {
            speaks: 'user',
            msg: {
                text: {
                    text: queryText
                }
            }
        }
        this.setState({ messages: [...this.state.messages, says] });
        const res = await axios.post('/api/df_text_query', { text: queryText });

        for (let msg of res.data.fulfillmentMessages) {
            says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says] });
        }
    };


    async df_event_query(eventName) {

        const res = await axios.post('/api/df_event_query', { event: eventName });

        for (let msg of res.data.fulfillmentMessages) {
            let says = {
                speaks: 'bot',
                msg: msg
            }

            this.setState({ messages: [...this.state.messages, says] });
        }
    };

    componentDidMount() {
        this.df_event_query('welcome');
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        if (this.talkInput) {
            this.talkInput.focus();
        }
    }
    renderCards(richContent) {
        return richContent.map((card, i) => <Card key={i} payload={card.structValue} />);

    }

    renderOneMessage(message, i) {

        if (message.msg && message.msg.text && message.msg.text.text) {

            return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
        } else if (message.msg && message.msg.payload && message.msg.payload.fields.richContent) { //message.msg.payload.fields.richContent.listValue.values

            return <div key={i}>
                <div className="df-card">
                    <div style={{ overflow: 'hidden' }}>
                        <div >
                            <div style={{ height: 460, width: message.msg.payload.fields.richContent.listValue.values.length * 270 }}>
                                {this.renderCards(message.msg.payload.fields.richContent.listValue.values)}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        }
    }

    renderMessages(returnedMessages) {

        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return this.renderOneMessage(message, i);

            }
            )
        } else {
            return null;
        }
    }

    _handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }

    render() {

        return (
            <div className='restaurant-chatbot-container'>
                <div className='restaurant-chatbot-inner-container'>
                    <nav className='restaurant-chatbot-header'>
                        <div className="nav-wrapper ">
                            <a href="/" className="brand-logo" style={{ fontSize: '1.5rem' }}>Lẩu Thuận Phát</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/" onClick={this.hide}>x</a></li>
                            </ul>
                        </div>
                    </nav>

                    <div id="chatbot" className='restaurant-chatbot-message-container'>

                        {this.renderMessages(this.state.messages)}
                        <div ref={(el) => { this.messagesEnd = el; }}
                            style={{ float: "left", clear: "both" }}>
                        </div>
                    </div>
                    <div className='restaurant-chatbot-input-container'>
                        <form className='restaurant-chatbot-input-form'>

                            <input style={{ margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%', border: 'none' }} ref={(input) => { this.talkInput = input; }}
                                placeholder="Nhắn tin...:"
                                onKeyPress={this._handleInputKeyPress}
                                id="user_says"
                                type="text" />
                            <button className="restaurant-chatbot-btn-send" >Gửi</button>
                        </form>
                    </div>
                </div>
            </div>
        );

    }
}

export default Chatbot;