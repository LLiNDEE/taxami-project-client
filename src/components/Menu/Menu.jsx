import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'

import './Menu.scss'

import useBoolean from '../../hooks/useBoolean'
import { useGlobal } from '../../providers/GlobalProvider'
import { useMenu } from '../../providers/MenuProvider'
import { clsx } from '../../utils/utils'

const resolveButtonColor = variant => 
variant === 'viewTask' ? true 
: variant === 'addTask' ? true
: variant === 'leaveTask' ? true
: variant === 'viewInProgressTask' ? true
: false

const Menu = ({  }) => {

    const location = useLocation()
    const path = location.pathname
    
    const { executeTakeTask, modalData, executeAddTask } = useMenu()

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
                     {page === 'byggnad' && 
                        <>
                            <p className="optionItem" onClick={() => (showModalVariant('addTask'), hideOptions())}>Lägg till uppgift</p> 
                        </>
                     }
                     {userRole === 'customer' && <p className="optionItem" onClick={() => (showModalVariant('createBuilding'), hideOptions())}>Skapa byggnad</p>}
                 </div>
            }
          <div className="innerMenu">
              <div className={clsx("menuButton leftButton", {cancelButton: resolveButtonColor(modalVariant)})}>
                  
                  {(page === 'byggnad' || page === 'mittkonto' || page === 'oversikt') && (modalStatus !== 'SHOWN' || modalVariant === 'leaveBuilding') && <Link onClick={() => (hideModal(), hideOptions())} to="/oversikt" className="link">Tillbaka</Link>}
                  {modalVariant === 'viewInProgressTask' && <p onClick={() => showModalVariant('leaveTask')}>Lämna uppgift</p>}
                  {modalVariant === 'viewTask' || modalVariant === 'addTask' || modalVariant === 'leaveTask' && 
                        <p onClick={hideModal}>Avbryt</p>
                  }
              </div>
              <div className="menuButton mainButton" onClick={() => toggleOptions(isOptionsVisible)}>
                    <p className={clsx("menuAddIcon", {menuAddIconRotate: isOptionsVisible})}>
                        <AddIcon />
                    </p>
              </div>
              <div className={clsx("menuButton rightButton", {acceptButton: resolveButtonColor(modalVariant)})}>
                    {modalVariant === 'viewTask' && <p onClick={() => (executeTakeTask({...takeTaskDetails, user_id: userID}), hideModal())}>Antag</p>}
                    {modalVariant === 'viewInProgressTask' && <p>Klarmarkera</p>}
                    {modalVariant === 'addTask' && <p onClick={() => (executeAddTask(modalData), hideModal())}>Lägg till</p>}
                    {modalStatus !== 'SHOWN' && page == 'oversikt' && <Link className="link" to="/mittkonto">Mitt konto</Link>}
                    {modalVariant === 'leaveTask' && <p style={{fontSize: "1.2rem"}} onClick={() => console.log(modalData)}>Ja</p>}
              </div>
          </div>
        </div>
      </>
  )
}

export default Menu