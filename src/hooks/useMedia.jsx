import React, { useState, useEffect } from 'react'

export const getMedia = query => window.matchMedia(query)

const useMedia = (query, defaultValue) => {

    const [state, setState] = useState(defaultValue ?? (() => getMedia(query).matches))

    useEffect(() => {
        let mounted = true
        const media = getMedia(query)
        const onChange = () => mounted && setState(media.matches)
        media.addEventListener('change', onChange)
        return () => {
            mounted = false
            media.removeEventListener('change', onChange)
        }
    }, [])

    return state

}

export default useMedia