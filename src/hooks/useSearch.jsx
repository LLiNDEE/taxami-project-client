import React, { useState, useMemo } from 'react'

const isInputValid = (value, input) => value.toLowerCase().startsWith(input.toLowerCase())

const useSearch = ({ items }) => {

    const methods = useMemo(() => ({
        searchByInput: input => {
            const foundItems = []
            items.forEach(item => {
                const firstName = item.first_name
                const lastName = item.last_name
                
                if(!firstName || !lastName) return
                if(isInputValid(firstName, input) || isInputValid(lastName, input)) foundItems.push(item)

            })
            if(foundItems.length < 1) return []
            return foundItems
        }
    }), [items])

    return methods

}

export default useSearch