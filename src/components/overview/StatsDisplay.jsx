import React from 'react';
import { Link } from 'react-router-dom'

import './StatsDisplay.scss'

const StatsDisplay = ({ title, value, buttonText, onClick, useLink  }) => {


    return (
        <div className="statsItem">
            <h4 className="statsItemTitle">{title}</h4>
            <div className="statsValue">
                <p className="value">{value}</p>
            </div>
            {!useLink && <button className="viewMoreButton" onClick={onClick ?? ""}>{buttonText}</button>}
            {useLink && <Link to={useLink} ><button className="viewMoreButton" onClick={onClick ?? ""}>{buttonText}</button></Link>}
      </div>
    )

};

export default StatsDisplay;
