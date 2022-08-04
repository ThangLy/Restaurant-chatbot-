import { useState, useEffect, useRef, createContext } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'universal-cookie';
import Message from './Message';
import QuickReplies from './QuickReplies';

const cookies = new Cookies();
export const UserContext = createContext();

export default function Chatbot(props) {
    const [messages, setMessages] = useState([]);
    const inputRef = useRef(null);
    const [disabledInput, setDisabledInput] = useState(false);

    const updateMessages = (msg) => {
        setMessages((currentMessage) => {
            return [...currentMessage, msg];
        });
    };

    if (cookies.get('userID') === undefined) {
        cookies.set('userID', uuidv4(), { path: '/' });
    }

    const df_text_query = async (text) => {
        let newMessage = {
            speaks: 'user',
            msg: {
                text: {
                    text: text
                }
            }
        };
        updateMessages(newMessage);

        const res = await axios.post('/api/df_text_query', { text: text });
        res.data.fulfillmentMessages.forEach((msg) => {
            newMessage = {
                speaks: 'bot',
                msg: msg,
            };
            updateMessages(newMessage);
        });
    };

    const df_event_query = async (eventName) => {

        const res = await axios.post('/api/df_event_query', { event: eventName });
        res.data.fulfillmentMessages.forEach((msg) => {
            let newMessage = {
                speaks: 'bot',
                msg: msg,
            };
            updateMessages(newMessage);
        });
    };
    const handleQuickReplyPayload = (event, text) => {
        event.preventDefault();
        event.stopPropagation();

        df_text_query(text);

    };

    const renderMessage = (msg, index) => {
        if (msg.msg?.text?.text) {
            return (
                <Message
                    key={index}
                    speaks={msg.speaks}
                    text={msg.msg.text.text}
                />
            );
        } else if (msg.msg?.payload?.fields?.richContent) { //message.msg.payload.fields.richContent.listValue.values

            return <Message
                key={index}
                speaks={msg.speaks}
                content={msg.msg.payload.fields.richContent}
                isImage={true} />;

        } else if (
            msg.msg?.payload?.fields?.options) {

            return <QuickReplies
                text={msg.msg.payload.fields.text ? msg.msg.payload.fields.text : null}
                key={index}
                replyClick={handleQuickReplyPayload}
                speaks={msg.speaks}
                content={msg.msg.payload.fields.options.listValue.values} />;
        } else {
            return null;
        }
    };

    const renderMessages = (messages) => {
        if (messages) {
            return messages.map((message, index) => {
                return renderMessage(message, index);
            });
        }
        return null;
    };

    useEffect(() => {
        async function fetchData() {
            await df_event_query('Welcome');
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    const handleInputMessage = (event) => {
        if (event.key === 'Enter') {
            df_text_query(event.target.value);
            event.target.value = '';
            handleInputDelay();
        }
    };

    const handleButtonMessage = () => {
        df_text_query(inputRef.current.value);
        inputRef.current.value = '';
        handleInputDelay();
    };

    const handleInputDelay = () => {
        setDisabledInput(true);
        setTimeout(() => {
            setDisabledInput(false);
        }, 1500);
        setTimeout(() => {
            inputRef.current.focus();
        }, 1600);
    };

    return (
        <UserContext.Provider value={messages}>
            <div className="card chat-bot-container mx-auto">
                <div
                    className="card-header text-center p-3 border-bottom-0"
                    style={{
                        borderTopLeftRadius: '15px',
                        borderTopRightRadius: '15px',
                    }}
                >
                    <p className="mb-0 fw-bold fs-5">
                        <span className="dot"></span> Nhà hàng Thuận Phát
                    </p>
                </div>

                <div className="card-body chat-bot">
                    {renderMessages(messages)}
                    <ScrollToBottom messages={messages} />
                </div>

                <div
                    className="card-footer input-group border-top-0"
                    style={{
                        borderBottomLeftRadius: '15px',
                        borderBottomRightRadius: '15px',
                    }}
                >
                    <input
                        type="text"
                        autoFocus
                        name="inputMessage"
                        placeholder="nhập tin nhắn..."
                        ref={inputRef}
                        onKeyUp={handleInputMessage}
                        className="form-control"
                        disabled={disabledInput}
                    />

                    <button onClick={handleButtonMessage} className="input-group-text">
                        <i className="fas fa-paper-plane" style={{ color: '#9c191b' }}></i>
                    </button>
                </div>
            </div>
        </UserContext.Provider>
    );
}

function ScrollToBottom(props) {
    const elementRef = useRef(null);
    useEffect(() => {
        elementRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [props.messages]);
    return <div ref={elementRef} />;
}