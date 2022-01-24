import { SERVER_URL } from '../utils/constants'

export const request = (...params) => fetch(...params).then(res => res.json()).then(data =>{
    console.log("Data from request.js --> ", data)
    if(!data?.success || data?.type === 'error') throw data

    return data
})

export const post = (url, body, config) => request(SERVER_URL + url, {
    ...config??null,
    headers:{
        'Content-Type': 'application/json',
        ...config?.headers??null
    },
    method: 'POST',
    body: JSON.stringify({...body})
})