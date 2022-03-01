import React from 'react'

import './Menu.scss'

const Menu = () => {
  return (
      <>
        <div className="menu">
          <div className="innerMenu">
              <div className="testMenu"></div>
              <div className="menuButton leftButton">
                  <p>Byggnader</p>
              </div>
              <div className="menuButton mainButton">
                  <p>Översikt</p>
              </div>
              <div className="menuButton rightButton">
                  <p>Uppgifter</p>
              </div>
          </div>
        </div>
      </>
  )
}

export default Menu