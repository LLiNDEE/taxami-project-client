import React from 'react'

const Flex = ({ justify, align, direction, gap, inline, ...props }) => {
    return (
        <div
        {...props}
        style={{
            ...props.style??null,
            justifyContent: justify ?? props.style?.justifyContent,
            alignItems: align ?? props.style?.align,
            flexDirection: direction ?? props.style?.flexDirection,
            gap: gap ?? props.style?.gap,
            display: inline ? "inline-flex" : "flex"
        }}
        />
    )
}

export default Flex