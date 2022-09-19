import React from 'react'
import './Popup.css'

export default function LoginPopUp(props) {
    return (props.trigger)? (
        <div className="loginpopup">
            <div className="loginpopup-inner">
                <button className="close-btn">
                    close
                </button>
                {props.children}
            </div>            
        </div>
    ) : "";
}
