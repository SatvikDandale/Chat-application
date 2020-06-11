import React from 'react';

import Header from './header';
import SideBar from './sideTabBar';
import Dashboard from './Sub-Components/dashboard';
import People from './Sub-Components/people';
import Chats from './Sub-Components/chats';

import './mainChatWindow.css';

class MainChatWindow extends React.Component {
    state = {
        selected: "chats"  // Sidebar component clicked and selected
    }

    updatedSelected = (newChoice) => {
        this.setState({
            selected: newChoice
        })
    }

    renderContent = () => {
        if (this.state.selected === "chats")
            return <Chats />
        else if (this.state.selected === "people")
            return <People />
        return <Dashboard />
    }

    render() {
        return (
            <div className="outer-layout">
                <Header />
                <div className="sub-window">
                    <SideBar updatedSelected={this.updatedSelected} current={this.state.selected}/>
                    {this.renderContent()}
                </div>
            </div>
        )
    }
}

export default MainChatWindow;