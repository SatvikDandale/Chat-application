import React from 'react';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Scrollbars } from 'react-custom-scrollbars';

import ChatBox from './chatBox';

import './chats.css';

class Chats extends React.Component {
    channelList = [
        "channel-1",
        "channel-2",
        "channel-3",
        // "channel-1",
        // "channel-2",
        // "channel-3",
        // "channel-1",
        // "channel-2",
        // "channel-3",
        "channel-4"
    ];

    messagePersonList = [
        "Person A",
        "Person B",
        "Person C"
    ]

    state = {
        channelCollapse: true,
        messageCollpase: true
    }

    listElement = (listToMap) => {
        return (
            <List component="nav">
                {listToMap.map((channelName, index) => {
                    return (
                        <ul key={index} className={"channel-list-ul " + (index === 0 ? "first" : "")}>
                            <div>{channelName}</div>
                        </ul>
                    )
                })}
            </List>
        )
    }

    render() {
        return (
            <div className="main-area chat-area">
                <div className="chat-list">
                    <div className="chat-list-subtitle">
                        <p>Your channels</p>
                    </div>
                    <div className="channel-list">
                        <Scrollbars autoHide>
                            <div className="channel-list-header" onClick={() => this.setState({ channelCollapse: !this.state.channelCollapse })}>
                                Channels
                            {this.state.channelCollapse ? <ExpandLess /> : <ExpandMore />}
                            </div>

                            <Collapse in={this.state.channelCollapse} timeout="auto" unmountOnExit>
                                <div>
                                    {this.listElement(this.channelList)}
                                </div>
                            </Collapse>
                            <div className="channel-list-header" onClick={() => this.setState({ messageCollpase: !this.state.messageCollpase })}>
                                Direct Messages
                            {this.state.messageCollpase ? <ExpandLess /> : <ExpandMore />}
                            </div>

                            <Collapse in={this.state.messageCollpase} timeout="auto" unmountOnExit>
                                <div>
                                    {this.listElement(this.messagePersonList)}
                                </div>
                            </Collapse>
                        </Scrollbars>
                    </div>
                </div>
                <div className="chat-box">
                    <ChatBox />
                </div>
            </div>
        )
    }
}

export default Chats;