import React from 'react'

import { getCSSVariable } from '../utils/utils'
import useMedia from './useMedia'

const useBreakpoint = () => {

    const breakpoints = {
        sm: getCSSVariable(`--breakpoint-sm`),
        md: getCSSVariable(`--breakpoint-md`),
        lg: getCSSVariable(`--breakpoint-lg`),
        xl: getCSSVariable(`--breakpoint-xl`),
        '2xl': getCSSVariable(`--breakpoint-2xl`),
    }

    const sm = useMedia(`(max-width: ${breakpoints.sm})`)
    const md = useMedia(`(max-width: ${breakpoints.md})`)
    const lg = useMedia(`(max-width: ${breakpoints.lg})`)
    const xl = useMedia(`(max-width: ${breakpoints.xl})`)
    const xxl = useMedia(`(max-width: ${breakpoints[`2xl`]})`)

    return {sm, md, lg, xl, xxl}

}

export default useBreakpoint