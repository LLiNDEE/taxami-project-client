import React from 'react'
import AddIcon from '@mui/icons-material/Add';

import './Menu.scss'

import useBoolean from '../../hooks/useBoolean'
import { useGlobal } from '../../providers/GlobalProvider';
import { clsx } from '../../utils/utils';

const Menu = ({  }) => {

    const { showModalVariant, modalStatus } = useGlobal()

    const [isOptionsVisible, { toggle: toggleOptions, off: hideOptions }] = useBoolean(undefined)

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
                  <p>Byggnader</p>
              </div>
              <div className="menuButton mainButton" onClick={() => toggleOptions(isOptionsVisible)}>
                    <p className={clsx("menuAddIcon", {menuAddIconRotate: isOptionsVisible})}>
                        <AddIcon />
                    </p>
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