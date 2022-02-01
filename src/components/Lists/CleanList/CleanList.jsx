import React from 'react';

import './CleanList.scss'

const CleanList = ({ keys, children }) => {
  return (
    <div className="cleanList">
        <div className="keys">
        {keys.map(key => (
            <p className="keyTitle" key={key} >{key}</p>
        ))}
        <p className="buttonKey">Button</p>
        </div>
        {children}
    </div>
  )
};

export default CleanList;
