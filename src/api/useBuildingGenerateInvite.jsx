
import useAsync from '../hooks/useAsync'
import { post } from './request'

const invite = params => post('/building/generate/invite', params)

const useBuildingGenerateInvite = () => {

    const { isSuccess, data, ...props } = useAsync(invite)

    return { isSuccess, data, ...props }

}

export default useBuildingGenerateInvite