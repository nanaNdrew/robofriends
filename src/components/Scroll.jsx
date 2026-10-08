import React from 'react';

const Scroll = (props) => {
  return (
    <div className="scroll-area">
      {props.children}
    </div>
  );
};

export default Scroll;
