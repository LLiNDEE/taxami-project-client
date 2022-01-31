import React from 'react';

import './List.scss'

const List = ({ keys, children }) => {
  return (
    <div className="list">
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

export default List;
