import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const unlockAccount = params => post("/admin/unlock/account", params)

const useAdminUnlockAccount = () => {
  const { isSuccess, data, ...props } = useAsync(unlockAccount)

  return {isSuccess, data, ...props}
}

export default useAdminUnlockAccount