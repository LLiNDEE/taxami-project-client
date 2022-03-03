import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'

import './Menu.scss'

import useBoolean from '../../hooks/useBoolean'
import { useGlobal } from '../../providers/GlobalProvider'
import { clsx } from '../../utils/utils'

const Menu = ({  }) => {

    const location = useLocation()
    const path = location.pathname

    const { showModalVariant, modalStatus, modalVariant } = useGlobal()

    const [isBuildingPage, setIsBuildingPage] = useState(undefined)

    const [isOptionsVisible, { toggle: toggleOptions, off: hideOptions }] = useBoolean(undefined)

    useEffect(() => {
        if(!path) return

        if(path.includes("byggnad")) setIsBuildingPage(true)

    }, [path])

  return (
      <>
        <div className={clsx("menu")}>
            {isOptionsVisible && 
                <div className="options">
                     <p className="optionItem" onClick={() => (showModalVariant('joinBuilding'), hideOptions())}>Gå med i byggnad</p>
                     <p className="optionItem" onClick={() => (showModalVariant('createBuilding'), hideOptions())}>Skapa byggnad</p>
                 </div>
            }
          <div className="innerMenu">
              <div className="testMenu"></div>
              <div className="menuButton leftButton">
                  
                  {isBuildingPage && modalStatus !== 'SHOWN' && <p>Tillbaka</p>}
                  {modalVariant === 'viewTask' && <p>Avbryt</p>}
              </div>
              <div className="menuButton mainButton" onClick={() => toggleOptions(isOptionsVisible)}>
                    <p className={clsx("menuAddIcon", {menuAddIconRotate: isOptionsVisible})}>
                        <AddIcon />
                    </p>
              </div>
              <div className="menuButton rightButton">
                  {modalVariant === 'viewTask' && <p>Antag</p>}
                  {modalStatus !== 'SHOWN' && !isBuildingPage && <p>Uppgifter</p>}
                  {isBuildingPage && modalStatus !== 'SHOWN' && <p>Knapp 2</p>}
              </div>
          </div>
        </div>
      </>
  )
}

export default Menu