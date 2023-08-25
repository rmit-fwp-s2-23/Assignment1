import React from 'react'
import "./ReviewPopup.css";

function ReviewPopup(props) {
  return (props.trigger) ? (
    <div className='pop-up'>
        <div className='pop-up-inner'>
            <button onClick = {() => props.setTrigger(false)}className='close-button'>X</button>
            {props.children}
        </div>
    </div>
  ):
  "";
}
export default ReviewPopup;
