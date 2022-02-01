import React from 'react';

import './List.scss'

import { clsx } from '../../utils/utils';

const List = ({ keys, children, variant = "list" }) => {
  return (
    <div className={clsx(
      {
        [variant]: true
      }
    )}>
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
