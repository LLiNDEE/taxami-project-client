



export const clsx = (...args) => 
    args.map(arg => 
        isObject(arg) ? Object.entries(arg).reduce((p, [k, v]) => `${p} ${v ? k : ""}`.trim(), "").trim()
        : isArray(arg) ? clsx(...arg)
        : isString(arg) ? arg.trim()
        : ""
    ).join(" ").trim()


export const convertMicroToMilli = micro => {
    const last3digits = micro % 1000
    const milli = (micro - last3digits) / 1000
    return milli
}

export const getToken = () => sessionStorage.getItem('token')

export const getCSSVariable = key => getComputedStyle(document.documentElement).getPropertyValue(key).trim()
export const setCSSVariable = (key, value) => document.documentElement.style.setProperty(key, value) 

export const isNumber = v => typeof v === 'number' && !isNaN(v)
export const isNull = v => v === null
export const isUndefined = v => v === undefined
export const isNullish = v => v == undefined
export const isObject = v =>  !!v && typeof v === 'object' && !Array.isArray(v)
export const isString = v =>  typeof v === 'string'
export const isFunction = v =>  typeof v === 'function'
export const isArray = v =>  Array.isArray(v)
export const isBoolean = v => typeof v === 'boolean'
export const isUpperCase = v => v === v.toUpperCase()
export const isLowerCase = v => v === v.toLowerCase()