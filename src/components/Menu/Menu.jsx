import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'

import './Menu.scss'

import useBoolean from '../../hooks/useBoolean'
import { useGlobal } from '../../providers/GlobalProvider'
import { useMenu } from '../../providers/MenuProvider'
import { clsx } from '../../utils/utils'

const Menu = ({  }) => {

    const location = useLocation()
    const path = location.pathname
    
    const { executeTakeTask } = useMenu()

    const { showModalVariant, modalStatus, modalVariant, hideModal, userRole, userID, takeTaskDetails, setTakeTaskDetails } = useGlobal()

    const [page, setPage] = useState(undefined)

    const [isOptionsVisible, { toggle: toggleOptions, off: hideOptions }] = useBoolean(undefined)

    useEffect(() => {
        if(!path) return

        if(path.includes("byggnad")) {
            setPage("byggnad")
        }
        if(path.includes('mittkonto')) setPage("mittkonto")
        if(path.includes('oversikt')) setPage("oversikt")

    }, [path])

  return (
      <>
        <div className={clsx("menu")}>
            {isOptionsVisible && 
                <div className="options">
                     <p className="optionItem" onClick={() => (showModalVariant('joinBuilding'), hideOptions())}>Gå med i byggnad</p>
                     {/* <p className="optionItem" onClick={() => (hideModal(), hideOptions())}><Link className="link" to="/mittkonto">Mitt konto</Link></p> */}
                     {userRole === 'customer' && <p className="optionItem" onClick={() => (showModalVariant('createBuilding'), hideOptions())}>Skapa byggnad</p>}
                 </div>
            }
          <div className="innerMenu">
              <div className={clsx("menuButton leftButton", {cancelButton: modalVariant === 'viewTask' || modalVariant === 'viewInProgressTask'})}>
                  
                  {(page === 'byggnad' || page === 'mittkonto' || page === 'oversikt') && (modalStatus !== 'SHOWN' || modalVariant === 'leaveBuilding') && <Link onClick={() => (hideModal(), hideOptions())} to="/oversikt" className="link">Tillbaka</Link>}
                  {modalVariant === 'viewTask' && <p onClick={hideModal}>Avbryt</p>}
                  {modalVariant === 'viewInProgressTask' && <p onClick={() => showModalVariant('leaveTask')}>Lämna uppgift</p>}
              </div>
              <div className="menuButton mainButton" onClick={() => toggleOptions(isOptionsVisible)}>
                    <p className={clsx("menuAddIcon", {menuAddIconRotate: isOptionsVisible})}>
                        <AddIcon />
                    </p>
              </div>
              <div className={clsx("menuButton rightButton", {acceptButton: modalVariant === 'viewTask' || modalVariant === 'viewInProgressTask'})}>
                    {modalVariant === 'viewTask' && <p onClick={() => (executeTakeTask({...takeTaskDetails, user_id: userID}), hideModal())}>Antag</p>}
                    {modalVariant === 'viewInProgressTask' && <p>Klarmarkera</p>}
                    {/* {modalStatus !== 'SHOWN' && page !== 'byggnad' && <p>Uppgifter</p>} */}
                    {/* {page === 'byggnad' && modalStatus !== 'SHOWN' && <p>Uppgifter</p>} */}
                    {modalStatus !== 'SHOWN' && page == 'oversikt' && <Link className="link" to="/mittkonto">Mitt konto</Link>}
              </div>
          </div>
        </div>
      </>
  )
}

export default Menu