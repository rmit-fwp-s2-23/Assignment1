import './PopUp.css';
import React from "react";

// A functional component that renders a pop-up based on the 'trigger' prop value
function PopUp(props) {
  // If 'trigger' prop is true, render the pop-up
  return props.trigger ? (
    <div className="pop-up">
      <div className="pop-up-inner">
        <button
          onClick={() => props.setTrigger(false)}
          className="close-button">
          X
        </button>
        {props.children} {/* Render the child components inside the pop-up */}
      </div>
    </div>
  ) : (
    "" // If 'trigger' prop is false, render nothing (empty string)
  );
}

export default PopUp;