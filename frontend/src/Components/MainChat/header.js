import React from 'react';

import Icon from '../../Assests/Images/icon-logo-2.png'
import DownArrowIcon from '../../Assests/Images/ic_expand_more_24px.png';

export default function Header() {
    return (
        <div className="header" >
            <div className="header-icon-box">
                <img src={Icon} className="icon" alt="header-logo" />
            </div>
            <div className="chat-window-header">
                <div className="room-option-button">
                    <p className="heading">Room A</p>
                    <div className="arrow-section">
                        <img src={DownArrowIcon} alt="down-arrow" />
                    </div>
                </div>
            </div>
        </div>
    )
}