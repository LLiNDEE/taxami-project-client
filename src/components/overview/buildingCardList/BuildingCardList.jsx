import React from 'react'
import { Link } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import CardList from '../../Lists/CardList/CardList'

const BuildingCardList = ({ buildings }) => {
  return (
    <CardList>
        {buildings.map(building => (
            <div className="card" key={building._id}>
                <p className="cardTitle">{building.building_name}</p>
                <p className="cardData">Tillgängliga uppgifter: {building.tasks.length}</p>
                <p className="cardData">Medlemmar: {building.members.length}</p>
                <button className="cardButton"><Link className="cardLink" to={`/byggnad/${building._id}`}><RemoveRedEyeIcon/> Visa byggnad</Link></button>
            </div>
        ))}
    </CardList>
  )
}

export default BuildingCardList