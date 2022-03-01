import React from 'react'

import './CardList.scss'

const CardList = ({ children }) => {


    return (
        <div className="cardList">
            {children}
        </div>
    )

}

export default CardList