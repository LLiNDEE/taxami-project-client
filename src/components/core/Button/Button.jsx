import React from "react";

import { clsx } from '../../../utils/utils'

import './Button.scss'

const variants = {
    fill: 'fill',
    outline: 'outline'
}

const sizes = {
    lg: 'lg',
    sm: 'sm'
}

const colors = {
    primary: 'primary'
}

const Button = ({ variant = variants.fill, size = sizes.lg, color = colors.primary, ...props }) => {
    return(
        <button
        {...props}
        className={clsx({
            button: true,
            [`button--${variant}`]: variant,
            [`button--${size}`]: size,
            [`button--${color}`]: color,
            [props.className]: props.className
        })}
        />
    )
}

export default Button






