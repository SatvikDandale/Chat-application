import React from 'react';
import TextField from '@material-ui/core/TextField';
import MessageList from './messageList';
import { useState } from 'react'

const dummyMessageList = [
    {
        user: "User A",
        message: "Incididunt aliquip officia commodo elit ullamco ad id ad reprehenderit."
    },
    {
        user: "User B",
        message: "Cupidatat laboris incididunt magna aliquip incididunt aliquip est elit."
    },
    {
        user: "User C",
        message: "Cupidatat do quis velit laboris incididunt elit irure."
    },
    {
        user: "User A",
        message: "Incididunt aliquip officia commodo elit ullamco ad id ad reprehenderit."
    },
    {
        user: "User B",
        message: "Cupidatat laboris incididunt magna aliquip incididunt aliquip est elit."
    },
    {
        user: "User C",
        message: "Cupidatat do quis velit laboris incididunt elit irure."
    },
    {
        user: "User A",
        message: "Incididunt aliquip officia commodo elit ullamco ad id ad reprehenderit."
    },
    {
        user: "User B",
        message: "Cupidatat laboris incididunt magna aliquip incididunt aliquip est elit."
    },
    {
        user: "User C",
        message: "Cupidatat do quis velit laboris incididunt elit irure."
    },
    {
        user: "User A",
        message: "Incididunt aliquip officia commodo elit ullamco ad id ad reprehenderit."
    },
    {
        user: "User B",
        message: "Cupidatat laboris incididunt magna aliquip incididunt aliquip est elit."
    },
    {
        user: "User C",
        message: "Cupidatat do quis velit laboris incididunt elit irure."
    },
]

function ChatBox() {
    const [messageList, setmessageList] = useState([...dummyMessageList]);    
    console.log(messageList)
    const [message, setMessage] = useState("");
    // let message = "";

    const handleNewMessageChange = (event) => {
        setMessage(event.target.value)
    }

    const addNewMessage = () => {
        setmessageList([...messageList, {user: "User A", message}])
        setMessage("")
        console.log(messageList);
    }

    return (
        <div className="chat-area-border">
            <div className="chat-header">
                <div className="chat-name">
                    #general
                </div>
                <div className="chat-description">
                    A chat description
                </div>
            </div>
            <div className="chat-message">
                <MessageList dummyMessageList={messageList}/>
            </div>
            <div className="new-message">
                <div className="message-options">
                    Attach
                </div>
                <div className="message-text">
                    <TextField
                        name="new-message"
                        placeholder="New Message"
                        id="new-message-text-field"
                        variant="outlined"
                        multiline
                        value={message}
                        // rows={2}
                        onChange={handleNewMessageChange}
                    >

                    </TextField>
                </div>
                <button className="send-button" onClick={addNewMessage}>
                    Send
                </button>
            </div>

        </div>
    )
}

export default ChatBox;