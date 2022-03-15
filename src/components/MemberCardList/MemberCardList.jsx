import React from 'react'
import { useGlobal } from '../../providers/GlobalProvider'

import CardList from '../Lists/CardList/CardList'



const MemberCardList = ({ members, tasks, permissions }) => {

    const { showModalVariant } = useGlobal()

    return (
        <CardList>
            {members.map(member => (
                <div className="card" key={member._id}>
                    <p className="cardTitle">{member.first_name}</p>
                    <p className="cardData">Antal pågående uppgifter: {tasks.filter(t => t.assigned_to === member._id && t.status === 'inProgress').length}</p>
                    <p className="cardData">Antal avklarade uppgifter: {tasks.filter(t => t.assigned_to === member._id && t.status === 'completed').length}</p>
                    <p className="cardButton" onClick={() => showModalVariant('viewMember', {member: member, permissions: permissions})} >Inspektera</p>
                </div>
            ))}
        </CardList>
    )

}

export default MemberCardList