import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import './JoinBuildingForm.scss'

import Input from '../core/Input/Input';
import Flex from '../core/Flex/Flex';
import Button from '../core/Button/Button'
import SuccessMessage from '../Alerts/SuccessMessage';
import InfoMessage from '../Alerts/InfoMessage'
import ErrorMessage from '../Alerts/ErrorMessage'
import { useData } from '../../providers/DataProvider';
import { useGlobal } from '../../providers/GlobalProvider';

const schema = yup.object().shape({
    invite_code: yup.string().min(35).required()
})


const JoinBuildingForm = () => {

    const { joinBuilding, joinBuildingSuccess, joinBuildingError, joinBuildingErrorType } = useData()
    const { userID } = useGlobal()

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = data => joinBuilding({user_id: userID, invite_code: data.invite_code})

  return (
    <div className="joinBuildingForm">
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="invite_code"
                control={control}
                defaultValue=""
                error={errors?.invite_code}
                render={({ field }) => <Input label="Inbjudningskod" error={!!errors?.invite_code} {...field} ref={null} /> }
            />
            {(errors?.invite_code || !!joinBuildingError) && (joinBuildingErrorType?.message === 'alreadyMember' ? <InfoMessage message="Du är redan medlem i byggnaden"/> : <ErrorMessage message="Ogiltig inbjudningskod" />)}
            {!!joinBuildingSuccess && <SuccessMessage message="Du gick med i byggnaden!" />}
            <Flex justify="right">
                <Button className="joinButton">Gå med</Button>
            </Flex>
        </form>
    </div>
  )
}

export default JoinBuildingForm